import type { ColumnReport } from "./types.js";

export class CompressionEvaluator {
  public static evaluateColumn(
    name: string,
    uncompressedBytes: number,
    compressedBytes: number,
    encodings: string[] = ["PLAIN", "RLE"]
  ): ColumnReport {
    const ratio = uncompressedBytes > 0 ? Number((compressedBytes / uncompressedBytes).toFixed(4)) : 1.0;
    return {
      name,
      uncompressedSizeBytes: uncompressedBytes,
      compressedSizeBytes: compressedBytes,
      compressionRatio: ratio,
      encodings,
    };
  }
}

// Encoding health scorer
// Divide by zero check
