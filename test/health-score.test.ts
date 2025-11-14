import test from "node:test";
import assert from "node:assert";
import { HealthScoreCalculator } from "../src/health-score.js";

test("HealthScoreCalculator should compute health score percentage", () => {
  const rowGroups = [
    { index: 0, rowCount: 100, totalSizeBytes: 10 * 1024 * 1024, isFragmented: true },
  ];
  const columns = [
    { name: "col1", uncompressedSizeBytes: 100, compressedSizeBytes: 30, compressionRatio: 0.3, encodings: [] },
  ];

  const score = HealthScoreCalculator.calculateHealthScore(rowGroups, columns);
  assert.strictEqual(score, 60); // 100 - 40
});

