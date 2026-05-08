module.exports = {
  ci: {
    collect: {
      staticDistDir: "./out",
      url: ["http://localhost/"],
      settings: {
        preset: "desktop",
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.92 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:seo": ["warn", { minScore: 0.95 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2000 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.05 }],
        "interactive": ["warn", { maxNumericValue: 2500 }],
        "total-byte-weight": ["error", { maxNumericValue: 1572864 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
