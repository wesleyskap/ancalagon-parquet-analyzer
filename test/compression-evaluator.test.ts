import test from "node:test";
import assert from "node:assert";
import { CompressionEvaluator } from "../src/compression-evaluator.js";

test("CompressionEvaluator should evaluate column compression ratios correctly", () => {
  const col = CompressionEvaluator.evaluateColumn("user_id", 1000, 400);
  assert.strictEqual(col.compressionRatio, 0.4);
  assert.strictEqual(col.uncompressedSizeBytes, 1000);
  assert.strictEqual(col.compressedSizeBytes, 400);
});

// Encoding health tests
