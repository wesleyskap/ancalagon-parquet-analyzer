import { InvalidHeaderError } from "./errors.js";

export class ParquetHeaderInspector {
  private static readonly MAGIC_BYTES = Buffer.from([0x50, 0x41, 0x52, 0x31]); // 'PAR1'

  public static isValidMagic(buffer: Buffer): boolean {
    if (!buffer || buffer.length < 12) {
      return false;
    }
    const headerMagic = buffer.subarray(0, 4);
    const footerMagic = buffer.subarray(buffer.length - 4);
    return headerMagic.equals(this.MAGIC_BYTES) && footerMagic.equals(this.MAGIC_BYTES);
  }

  public static validateMagic(buffer: Buffer): void {
    if (!this.isValidMagic(buffer)) {
      const headerStr = buffer && buffer.length >= 4 ? buffer.subarray(0, 4).toString("ascii") : "EMPTY";
      throw new InvalidHeaderError(headerStr);
    }
  }
}

