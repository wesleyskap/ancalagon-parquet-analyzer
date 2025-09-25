export class BinaryUtils {
  public static readInt32LE(buffer: Buffer, offset: number): number {
    if (offset < 0 || offset + 4 > buffer.length) {
      return 0;
    }
    return buffer.readInt32LE(offset);
  }
}

