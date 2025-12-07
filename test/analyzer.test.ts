import test from "node:test";
import assert from "node:assert";
import { ParquetAnalyzer } from "../src/analyzer.js";

test("ParquetAnalyzer should produce end-to-end diagnostic report", () => {
  const validBuffer = Buffer.concat([
    Buffer.from("PAR1"),
    Buffer.alloc(100),
    Buffer.from("PAR1"),
  ]);

  const analyzer = new ParquetAnalyzer();
  const report = analyzer.analyzeBuffer(validBuffer);

  assert.strictEqual(report.isValidParquet, true);
  assert.strictEqual(report.totalSizeBytes, 108);
  assert.ok(report.healthScore >= 0 && report.healthScore <= 100);
});

// Edge case test for corrupted buffer
