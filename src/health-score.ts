import type { RowGroupReport, ColumnReport } from "./types.js";

export class HealthScoreCalculator {
  public static calculateHealthScore(rowGroups: RowGroupReport[], columns: ColumnReport[]): number {
    if (rowGroups.length === 0) return 100;
    let score = 100;
    const fragmentedCount = rowGroups.filter((rg) => rg.isFragmented).length;
    score -= Math.round((fragmentedCount / rowGroups.length) * 40);
    return Math.max(0, score);
  }
}
