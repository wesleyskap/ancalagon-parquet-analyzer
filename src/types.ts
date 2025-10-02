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
