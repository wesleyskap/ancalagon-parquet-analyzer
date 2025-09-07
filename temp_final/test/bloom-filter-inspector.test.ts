import test from "node:test";
import assert from "node:assert/strict";
import { BloomFilterInspector } from "../src/bloom-filter-inspector.js";

test("BloomFilterInspector.parseHeader correctly decodes header size", () => {
  const buf = Buffer.alloc(16);
  buf.writeUInt32LE(2048, 0);

  const header = BloomFilterInspector.parseHeader(buf, 0);
  assert.equal(header.algorithm, "BLOCK_SPLIT_BLOOM_FILTER");
  assert.equal(header.hashFunction, "XXHASH");
  assert.equal(header.numBytes, 2048);
});

test("BloomFilterInspector.calculateFalsePositiveRate produces valid probability bounds", () => {
  const fpRate = BloomFilterInspector.calculateFalsePositiveRate(4096, 500);
  assert.ok(fpRate >= 0 && fpRate <= 1);
  assert.ok(fpRate < 0.05);

  const degradedRate = BloomFilterInspector.calculateFalsePositiveRate(64, 10000);
  assert.ok(degradedRate > 0.5);
});

test("BloomFilterInspector.inspectBloomFilter handles empty or invalid buffer gracefully", () => {
  const report = BloomFilterInspector.inspectBloomFilter("user_id", Buffer.alloc(0), 100);
  assert.equal(report.isValid, false);
  assert.equal(report.falsePositiveProbability, 1.0);
});
