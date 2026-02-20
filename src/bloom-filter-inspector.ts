import type { BloomFilterReport } from "./types.js";

export class BloomFilterInspector {
  public static parseHeader(buffer: Buffer, offset: number = 0): {
    algorithm: "BLOCK_SPLIT_BLOOM_FILTER";
    hashFunction: "XXHASH";
    numBytes: number;
  } {
    if (buffer.length < offset + 8) {
      return {
        algorithm: "BLOCK_SPLIT_BLOOM_FILTER",
        hashFunction: "XXHASH",
        numBytes: 0,
      };
    }

    const numBytes = buffer.readUInt32LE(offset);
    return {
      algorithm: "BLOCK_SPLIT_BLOOM_FILTER",
      hashFunction: "XXHASH",
      numBytes,
    };
  }

  public static calculateFalsePositiveRate(numBytes: number, numDistinctItems: number): number {
    if (numBytes <= 0 || numDistinctItems <= 0) {
      return 1.0;
    }

    const m = numBytes * 8; // total bits
    const n = numDistinctItems;
    // Standard BlockSplit Bloom Filter formula approximation with k = 8 blocks
    const k = 8;
    const exponent = (-k * n) / m;
    const p = Math.pow(1 - Math.exp(exponent), k);
    return Math.min(1.0, Math.max(0.0, Number(p.toFixed(6))));
  }

  public static inspectBloomFilter(
    columnName: string,
    filterBuffer: Buffer,
    distinctCount: number = 1000
  ): BloomFilterReport {
    const header = this.parseHeader(filterBuffer, 0);
    const isValid = filterBuffer.length >= 8 && header.numBytes > 0;
    const falsePositiveProbability = isValid
      ? this.calculateFalsePositiveRate(header.numBytes, distinctCount)
      : 1.0;

    return {
      columnName,
      algorithm: header.algorithm,
      hashFunction: header.hashFunction,
      numBytes: header.numBytes,
      falsePositiveProbability,
      isValid,
    };
  }
}

// Uncompressed bitset handling
