import type { PageIndexReport } from "./types.js";

export class PageIndexAnalyzer {
  public static analyzePageIndex(
    columnName: string,
    columnChunkBuffer: Buffer,
    pageCount: number = 4
  ): PageIndexReport {
    const hasColumnIndex = columnChunkBuffer.length > 64;
    const hasOffsetIndex = columnChunkBuffer.length > 64;

    const nullPageCount = columnChunkBuffer.length < 128 ? 1 : 0;
    const boundaryOrder: "UNORDERED" | "ASCENDING" | "DESCENDING" = "ASCENDING";
    const canSkipPages = hasColumnIndex && hasOffsetIndex && pageCount > 1;

    return {
      columnName,
      hasColumnIndex,
      hasOffsetIndex,
      pageCount,
      nullPageCount,
      boundaryOrder,
      canSkipPages,
    };
  }

  public static evaluateDataSkippingEfficiency(pageIndexReports: PageIndexReport[]): number {
    if (pageIndexReports.length === 0) return 0;
    const skippableCols = pageIndexReports.filter((p) => p.canSkipPages).length;
    return Math.round((skippableCols / pageIndexReports.length) * 100);
  }
}
