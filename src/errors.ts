export class ParquetAnalyzerError extends Error {
  constructor(message: string) {
    super(`ancalagon-parquet-analyzer: ${message}`);
    this.name = "ParquetAnalyzerError";
  }
}

export class InvalidHeaderError extends ParquetAnalyzerError {
  constructor(magic: string) {
    super(`invalid magic header bytes ${magic}, expected 'PAR1'`);
    this.name = "InvalidHeaderError";
  }
}

export class CorruptedFooterError extends ParquetAnalyzerError {
  constructor(message: string) {
    super(`corrupted metadata footer: ${message}`);
    this.name = "CorruptedFooterError";
  }
}
