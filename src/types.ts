export interface SchemaFieldReport {
  name: string;
  type: string;
  repetitionType: "REQUIRED" | "OPTIONAL" | "REPEATED";
}

export interface ColumnReport {
  name: string;
  uncompressedSizeBytes: number;
  compressedSizeBytes: number;
  compressionRatio: number;
  encodings: string[];
}

export interface RowGroupReport {
  index: number;
  rowCount: number;
  totalSizeBytes: number;
  isFragmented: boolean;
}

export interface DiagnosticReport {
  isValidParquet: boolean;
  totalSizeBytes: number;
  rowCount: number;
  rowGroupCount: number;
  healthScore: number;
  schemaFields: SchemaFieldReport[];
  columns: ColumnReport[];
  rowGroups: RowGroupReport[];
  warnings: string[];
}
// Diagnostic report property improvements

export interface BloomFilterReport {
  columnName: string;
  algorithm: "BLOCK_SPLIT_BLOOM_FILTER";
  hashFunction: "XXHASH";
  numBytes: number;
  falsePositiveProbability: number;
  isValid: boolean;
}

export interface PageIndexReport {
  columnName: string;
  hasColumnIndex: boolean;
  hasOffsetIndex: boolean;
  pageCount: number;
  nullPageCount: number;
  boundaryOrder: "UNORDERED" | "ASCENDING" | "DESCENDING";
  canSkipPages: boolean;
}

export interface DictionaryEfficiencyReport {
  columnName: string;
  dictionaryEntries: number;
  totalValues: number;
  cardinalityRatio: number;
  isEfficient: boolean;
  savingsRatio: number;
}
