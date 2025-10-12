import test from "node:test";
import assert from "node:assert";
import { ThriftMetadataDecoder } from "../src/thrift-decoder.js";

test("ThriftMetadataDecoder should decode varint integers", () => {
  const buf = Buffer.from([0x96, 0x01]);
  const res = ThriftMetadataDecoder.readVarint(buf, 0);
  assert.strictEqual(res.value, 150);
  assert.strictEqual(res.bytesRead, 2);
});

test("ThriftMetadataDecoder should decode zigzag integer values", () => {
  assert.strictEqual(ThriftMetadataDecoder.decodeZigzag(2), 1);
  assert.strictEqual(ThriftMetadataDecoder.decodeZigzag(1), -1);
});

// Thrift field header test coverage
