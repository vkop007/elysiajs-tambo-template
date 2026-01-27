import type { RunCreateParams } from "@tambo-ai/typescript-sdk/resources/threads/runs.js";

export const tools: RunCreateParams.Tool[] = [
  {
    name: "render_data_table",
    description: "Display a professional table of structured data.",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string" },
        columns: { type: "array", items: { type: "string" } },
        rows: {
          type: "array",
          items: { type: "array", items: { type: "any" } },
        },
      },
      required: ["columns", "rows"],
    },
  },
  {
    name: "render_chart",
    description: "Display a bar chart to visualize numerical trends.",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string" },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              value: { type: "number" },
            },
          },
        },
      },
      required: ["data"],
    },
  },
  {
    name: "render_pricing",
    description: "Show a pricing plan card to the user.",
    inputSchema: {
      type: "object",
      properties: {
        planName: { type: "string" },
        price: { type: "string" },
        features: { type: "array", items: { type: "string" } },
        isPopular: { type: "boolean" },
      },
      required: ["planName", "price", "features"],
    },
  },
];
