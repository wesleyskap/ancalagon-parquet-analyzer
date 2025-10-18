export class ThriftMetadataDecoder {
  public static readVarint(buffer: Buffer, offset: number): { value: number; bytesRead: number } {
    let result = 0;
    let shift = 0;
    let bytesRead = 0;

    while (offset + bytesRead < buffer.length) {
      const byte = buffer[offset + bytesRead];
      bytesRead++;
      result |= (byte & 0x7f) << shift;
      if ((byte & 0x80) === 0) {
        break;
      }
      shift += 7;
    }

    return { value: result, bytesRead };
  }

  public static decodeZigzag(n: number): number {
    return (n >>> 1) ^ -(n & 1);
  }
}

// Compact Protocol field header decoding logic
// Optional thrift field id resolution
