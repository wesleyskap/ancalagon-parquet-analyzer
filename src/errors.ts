export class ParquetAnalyzerError extends Error {
  public readonly code: string;
  constructor(message: string, code: string = "ERR_PARQUET_ANALYZER") {
    super(message);
    this.name = "ParquetAnalyzerError";
    this.code = code;
  }
}

export class InvalidHeaderError extends ParquetAnalyzerError {
  constructor(header: string) {
    super(`Invalid Parquet header magic bytes: expected 'PAR1', received '${header}'`, "ERR_INVALID_HEADER");
  }
}

export class CorruptedFooterError extends ParquetAnalyzerError {
  constructor(reason: string) {
    super(`Corrupted Parquet footer metadata: ${reason}`, "ERR_CORRUPTED_FOOTER");
  }
}

