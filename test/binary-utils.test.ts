import test from "node:test";
import assert from "node:assert";
import { BinaryUtils } from "../src/binary-utils.js";

test("BinaryUtils should read Int32LE correctly", () => {
  const buf = Buffer.alloc(4);
  buf.writeInt32LE(12345, 0);
  assert.strictEqual(BinaryUtils.readInt32LE(buf, 0), 12345);
});

