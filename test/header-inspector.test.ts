import test from "node:test";
import assert from "node:assert";
import { ParquetHeaderInspector } from "../src/header-inspector.js";
import { InvalidHeaderError } from "../src/errors.js";

test("ParquetHeaderInspector should validate valid PAR1 magic bytes", () => {
  const buf = Buffer.from("PAR1some_parquet_data");
  assert.strictEqual(ParquetHeaderInspector.isValidMagic(buf), true);
});

test("ParquetHeaderInspector should throw InvalidHeaderError for invalid magic bytes", () => {
  const invalidBuf = Buffer.from("CORRUPT");
  assert.throws(() => ParquetHeaderInspector.validateMagic(invalidBuf), InvalidHeaderError);
});
