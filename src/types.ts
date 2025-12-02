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
