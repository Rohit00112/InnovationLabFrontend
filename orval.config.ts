import { defineConfig } from "orval";

export default defineConfig({
  innovationLabFrontend: {
    input: {
      target: "./specs/innovation-lab-api-specs.json",
    },
    output: {
      target: "./src/lib/services/generated/frontend/index.ts",
      schemas: "./src/lib/services/generated/frontend/schemas",
      mode: "split",
      indexFiles: true,
      client: "react-query",
      httpClient: "fetch",
      clean: true,
      override: {
        query: {
          useQuery: true,
          useMutation: true,
          useInfinite: true,
        },
      },
    },
  },
  innovationLabNode: {
    input: {
      target: "./specs/innovation-lab-api-specs.json",
    },
    output: {
      target: "./src/lib/services/generated/node/index.ts",
      schemas: "./src/lib/services/generated/node/schemas",
      mode: "split",
      indexFiles: true,
      client: "fetch",
      baseUrl: {
        runtime: "process.env.BACKEND_API_BASE_URL",
      },
      clean: true,
    },
  },
});
