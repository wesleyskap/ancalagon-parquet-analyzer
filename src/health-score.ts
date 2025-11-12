import type { RowGroupReport, ColumnReport } from "./types.js";

export class HealthScoreCalculator {
  public static calculateHealthScore(rowGroups: RowGroupReport[], columns: ColumnReport[]): number {
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

    return Math.max(0, score);
  }
}
