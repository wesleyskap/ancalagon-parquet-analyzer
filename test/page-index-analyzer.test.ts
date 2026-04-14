import test from "node:test";
import assert from "node:assert/strict";
import { PageIndexAnalyzer } from "../src/page-index-analyzer.js";

test("PageIndexAnalyzer.analyzePageIndex extracts page index metadata correctly", () => {
  const mockBuffer = Buffer.alloc(128);
  const report = PageIndexAnalyzer.analyzePageIndex("timestamp_col", mockBuffer, 5);

  assert.equal(report.columnName, "timestamp_col");
  assert.equal(report.hasColumnIndex, true);
  assert.equal(report.hasOffsetIndex, true);
  assert.equal(report.canSkipPages, true);
  assert.equal(report.boundaryOrder, "ASCENDING");
});

test("PageIndexAnalyzer.evaluateDataSkippingEfficiency calculates aggregate percentage", () => {
  const reports = [
    PageIndexAnalyzer.analyzePageIndex("col1", Buffer.alloc(128), 4),
    PageIndexAnalyzer.analyzePageIndex("col2", Buffer.alloc(10), 1),
  ];

  const efficiency = PageIndexAnalyzer.evaluateDataSkippingEfficiency(reports);
  assert.equal(efficiency, 50);
});

