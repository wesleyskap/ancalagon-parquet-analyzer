import type { DictionaryEfficiencyReport } from "./types.js";

export class DictionaryScorer {
  public static evaluateDictionary(
    columnName: string,
    dictionaryEntries: number,
    totalValues: number,
    uncompressedBytes: number,
    dictionaryBytes: number
  ): DictionaryEfficiencyReport {
    if (totalValues <= 0) {
      return {
        columnName,
        dictionaryEntries: 0,
        totalValues: 0,
        cardinalityRatio: 1.0,
        isEfficient: false,
        savingsRatio: 0,
      };
    }

    const cardinalityRatio = Number((dictionaryEntries / totalValues).toFixed(4));
    // Dictionaries are efficient when cardinality is low (< 0.15) or size is reduced significantly
    const isEfficient = cardinalityRatio <= 0.15 && dictionaryBytes < uncompressedBytes;
    const savingsRatio =
      uncompressedBytes > 0
        ? Number(Math.max(0, (uncompressedBytes - dictionaryBytes) / uncompressedBytes).toFixed(4))
        : 0;

    return {
      columnName,
      dictionaryEntries,
      totalValues,
      cardinalityRatio,
      isEfficient,
      savingsRatio,
    };
  }
}
