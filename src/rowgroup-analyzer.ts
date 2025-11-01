import type { RowGroupReport } from "./types.js";

export class RowGroupAnalyzer {
  public static analyzeRowGroup(index: number, rowCount: number, totalSizeBytes: number): RowGroupReport {
    const isFragmented = totalSizeBytes < 32 * 1024 * 1024; // Less than 32MB threshold
    return {
      index,
      rowCount,
      totalSizeBytes,
      isFragmented,
    };
  }
}
