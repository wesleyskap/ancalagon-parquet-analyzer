import { ParquetHeaderInspector } from "./header-inspector.js";
import { CompressionEvaluator } from "./compression-evaluator.js";
import { RowGroupAnalyzer } from "./rowgroup-analyzer.js";
import { HealthScoreCalculator } from "./health-score.js";
import { BloomFilterInspector } from "./bloom-filter-inspector.js";
import { PageIndexAnalyzer } from "./page-index-analyzer.js";
import { DictionaryScorer } from "./dictionary-scorer.js";
import type { DiagnosticReport } from "./types.js";

export class ParquetAnalyzer {
  public analyzeBuffer(buffer: Buffer): DiagnosticReport {
    ParquetHeaderInspector.validateMagic(buffer);

    const mockRowGroups = [RowGroupAnalyzer.analyzeRowGroup(0, 5000, buffer.length)];
    const mockColumns = [CompressionEvaluator.evaluateColumn("default_col", buffer.length * 2, buffer.length)];

    const mockBloomFilter = BloomFilterInspector.inspectBloomFilter("default_col", buffer, 5000);
    const mockPageIndex = PageIndexAnalyzer.analyzePageIndex("default_col", buffer, 4);
    const mockDictionary = DictionaryScorer.evaluateDictionary("default_col", 50, 5000, buffer.length * 2, Math.floor(buffer.length * 0.2));

    const healthScore = HealthScoreCalculator.calculateHealthScore(
      mockRowGroups,
      mockColumns,
      [mockDictionary]
    );

    const warnings: string[] = [];
    if (mockRowGroups[0].isFragmented) {
      warnings.push("Row group 0 is fragmented (<32MB)");
    }
    if (!mockDictionary.isEfficient) {
      warnings.push("Column default_col dictionary cardinality ratio is suboptimal");
    }

    return {
      isValidParquet: true,
      totalSizeBytes: buffer.length,
      rowCount: 5000,
      rowGroupCount: mockRowGroups.length,
      healthScore,
      schemaFields: [{ name: "default_col", type: "BYTE_ARRAY", repetitionType: "OPTIONAL" }],
      columns: mockColumns,
      rowGroups: mockRowGroups,
      bloomFilters: [mockBloomFilter],
      pageIndexes: [mockPageIndex],
      dictionaryEfficiency: [mockDictionary],
      warnings,
    };
  }
}

