import type { SchemaFieldReport } from "./types.js";

export class SchemaInspector {
  public static extractFields(mockSchema: Array<{ name: string; type: string; optional?: boolean }>): SchemaFieldReport[] {
    return mockSchema.map((field) => ({
      name: field.name,
      type: field.type,
      repetitionType: field.optional ? "OPTIONAL" : "REQUIRED",
    }));
  }
}
