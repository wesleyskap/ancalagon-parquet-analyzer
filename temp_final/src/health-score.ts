import type { RowGroupReport, ColumnReport, DictionaryEfficiencyReport } from "./types.js";

export class HealthScoreCalculator {
  public static calculateHealthScore(
    rowGroups: RowGroupReport[],
    columns: ColumnReport[],
    dictionaryReports?: DictionaryEfficiencyReport[]
  ): number {
    if (rowGroups.length === 0) {
      return 100;
    }

    let score = 100;
    const fragmentedCount = rowGroups.filter((rg) => rg.isFragmented).length;
    const fragmentationRatio = fragmentedCount / rowGroups.length;

    score -= Math.round(fragmentationRatio * 40); // Up to -40 for fragmentation

    const poorCompressCount = columns.filter((c) => c.compressionRatio > 0.85).length;
    if (columns.length > 0) {
      score -= Math.round((poorCompressCount / columns.length) * 30); // Up to -30 for poor compression
    }

    if (dictionaryReports && dictionaryReports.length > 0) {
      const inefficientDictCount = dictionaryReports.filter((d) => !d.isEfficient).length;
      score -= Math.round((inefficientDictCount / dictionaryReports.length) * 15); // Up to -15 for inefficient dictionaries
    }

    return Math.max(0, score);
  }
}
