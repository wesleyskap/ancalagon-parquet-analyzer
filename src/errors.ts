export class ParquetAnalyzerError extends Error {
  constructor(message: string) {
    super(`ancalagon-parquet-analyzer: ${message}`);
    this.name = "ParquetAnalyzerError";
  }
}
