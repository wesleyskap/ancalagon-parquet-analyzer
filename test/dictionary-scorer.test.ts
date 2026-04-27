import test from "node:test";
import assert from "node:assert/strict";
import { DictionaryScorer } from "../src/dictionary-scorer.js";

test("DictionaryScorer.evaluateDictionary identifies highly efficient dictionary encoding", () => {
  const report = DictionaryScorer.evaluateDictionary("category_col", 50, 10000, 80000, 2000);
  assert.equal(report.isEfficient, true);
  assert.equal(report.cardinalityRatio, 0.005);
  assert.ok(report.savingsRatio > 0.9);
});

test("DictionaryScorer.evaluateDictionary detects high cardinality low efficiency dictionary", () => {
  const report = DictionaryScorer.evaluateDictionary("uuid_col", 9500, 10000, 80000, 85000);
  assert.equal(report.isEfficient, false);
  assert.equal(report.cardinalityRatio, 0.95);
  assert.equal(report.savingsRatio, 0);
});

