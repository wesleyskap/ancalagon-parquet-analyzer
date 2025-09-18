import { InvalidHeaderError } from "./errors.js";

export class ParquetHeaderInspector {
  public static readonly PARQUET_MAGIC = "PAR1";

  public static isValidMagic(buffer: Buffer): boolean {
    if (buffer.length < 4) return false;
    return buffer.subarray(0, 4).toString("utf-8") === this.PARQUET_MAGIC;
  }

  public static validateMagic(buffer: Buffer): void {
    if (!this.isValidMagic(buffer)) {
      throw new InvalidHeaderError(buffer.subarray(0, Math.min(4, buffer.length)).toString("utf-8"));
    }
  }
}
