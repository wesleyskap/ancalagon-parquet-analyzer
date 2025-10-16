import test from "node:test";
import assert from "node:assert";
import { SchemaInspector } from "../src/schema-inspector.js";

test("SchemaInspector should extract schema field metadata", () => {
  const fields = SchemaInspector.extractFields([
    { name: "id", type: "INT64" },
    { name: "email", type: "BYTE_ARRAY", optional: true },
  ]);

  assert.strictEqual(fields.length, 2);
  assert.strictEqual(fields[0].name, "id");
  assert.strictEqual(fields[0].repetitionType, "REQUIRED");
  assert.strictEqual(fields[1].repetitionType, "OPTIONAL");
});

