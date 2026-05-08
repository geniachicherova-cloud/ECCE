export const locales = ["en", "fr", "es"] as const;
export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";
