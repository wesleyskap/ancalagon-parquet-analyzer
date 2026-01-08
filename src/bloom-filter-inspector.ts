export class BloomFilterInspector {
  public static parseHeader(buffer: Buffer, offset: number = 0): {
    algorithm: "BLOCK_SPLIT_BLOOM_FILTER";
    hashFunction: "XXHASH";
    numBytes: number;
  } {
    if (buffer.length < offset + 8) {
      return { algorithm: "BLOCK_SPLIT_BLOOM_FILTER", hashFunction: "XXHASH", numBytes: 0 };
    }
    const numBytes = buffer.readUInt32LE(offset);
    return { algorithm: "BLOCK_SPLIT_BLOOM_FILTER", hashFunction: "XXHASH", numBytes };
  }
}
