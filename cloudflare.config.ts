import { defineConfig } from "cf/config";

export default defineConfig({
  accountId: "bb58d84a1b2f5c6e76a71c2e8844ffbe",
  worker: {
    name: "pnc-capital-partners",
    compatibilityDate: "2026-09-21",
    observability: {
      enabled: true
    }
  }
});
