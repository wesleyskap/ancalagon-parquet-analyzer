import test from "node:test";
import assert from "node:assert";
import { ParquetHeaderInspector, InvalidHeaderError } from "../src/header-inspector.js";

test("ParquetHeaderInspector should validate valid PAR1 magic bytes", () => {
  const validBuffer = Buffer.concat([
    Buffer.from("PAR1"),
    Buffer.alloc(8),
    Buffer.from("PAR1"),
  ]);

  assert.strictEqual(ParquetHeaderInspector.isValidMagic(validBuffer), true);
  assert.doesNotThrow(() => ParquetHeaderInspector.validateMagic(validBuffer));
});

test("ParquetHeaderInspector should throw InvalidHeaderError for invalid magic bytes", () => {
  const invalidBuffer = Buffer.from("INVALID_HEADER_BYTES");
  assert.strictEqual(ParquetHeaderInspector.isValidMagic(invalidBuffer), false);
  assert.throws(() => ParquetHeaderInspector.validateMagic(invalidBuffer), InvalidHeaderError);
});

