import { readFileSync } from "node:fs";
import { join } from "node:path";
import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);

const schema = JSON.parse(readFileSync(join(process.cwd(), "content/data/key-figures.schema.json"), "utf8"));
const data = JSON.parse(readFileSync(join(process.cwd(), "content/data/key-figures.json"), "utf8"));
const dataForValidation = { ...data };
delete dataForValidation.$schema;
const validate = ajv.compile(schema);

if (!validate(dataForValidation)) {
  console.error(validate.errors);
  throw new Error("key-figures.json failed schema validation.");
}

const today = new Date();
for (const figure of data.figures as Array<{ id: string; asOf: string }>) {
  if (new Date(`${figure.asOf}T00:00:00Z`).getTime() > today.getTime()) {
    throw new Error(`Key figure '${figure.id}' has a future asOf date.`);
  }
}

console.log(`Validated ${data.figures.length} key figures.`);
