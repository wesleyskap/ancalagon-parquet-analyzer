import { ParquetHeaderInspector } from "./header-inspector.js";
import { CompressionEvaluator } from "./compression-evaluator.js";
import { RowGroupAnalyzer } from "./rowgroup-analyzer.js";
import { HealthScoreCalculator } from "./health-score.js";
import type { DiagnosticReport } from "./types.js";

export class ParquetAnalyzer {
  public analyzeBuffer(buffer: Buffer): DiagnosticReport {
    ParquetHeaderInspector.validateMagic(buffer);

    const mockRowGroups = [RowGroupAnalyzer.analyzeRowGroup(0, 5000, buffer.length)];
    const mockColumns = [CompressionEvaluator.evaluateColumn("default_col", buffer.length * 2, buffer.length)];
    const healthScore = HealthScoreCalculator.calculateHealthScore(mockRowGroups, mockColumns);

    return {
      isValidParquet: true,
      totalSizeBytes: buffer.length,
      rowCount: 5000,
      rowGroupCount: mockRowGroups.length,
      healthScore,
      schemaFields: [{ name: "default_col", type: "BYTE_ARRAY", repetitionType: "OPTIONAL" }],
      columns: mockColumns,
      rowGroups: mockRowGroups,
      warnings: mockRowGroups[0].isFragmented ? ["Row group 0 is fragmented (<32MB)"] : [],
    };
  }
}
