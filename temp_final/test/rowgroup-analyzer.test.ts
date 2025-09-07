import test from "node:test";
import assert from "node:assert";
import { RowGroupAnalyzer } from "../src/rowgroup-analyzer.js";

test("RowGroupAnalyzer should flag small row groups as fragmented", () => {
  const smallGroup = RowGroupAnalyzer.analyzeRowGroup(0, 1000, 10 * 1024 * 1024);
  assert.strictEqual(smallGroup.isFragmented, true);

  const optimalGroup = RowGroupAnalyzer.analyzeRowGroup(1, 50000, 64 * 1024 * 1024);
  assert.strictEqual(optimalGroup.isFragmented, false);
});
