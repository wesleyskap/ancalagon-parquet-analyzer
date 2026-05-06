import {
  ParquetAnalyzer,
  ParquetHeaderInspector,
  ThriftMetadataDecoder,
  BloomFilterInspector,
  PageIndexAnalyzer,
  DictionaryScorer
} from "../src/index.js";

function runBenchmark() {
  const iterations = 100_000;
  const mockBuffer = Buffer.concat([
    Buffer.from("PAR1"),
    Buffer.alloc(100),
    Buffer.from("PAR1"),
  ]);

  const analyzer = new ParquetAnalyzer();

  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    ParquetHeaderInspector.isValidMagic(mockBuffer);
    analyzer.analyzeBuffer(mockBuffer);
    ThriftMetadataDecoder.decodeZigzag(i);
    BloomFilterInspector.calculateFalsePositiveRate(4096, 500);
    PageIndexAnalyzer.analyzePageIndex("col", mockBuffer, 4);
    DictionaryScorer.evaluateDictionary("col", 50, 1000, 4000, 200);
  }

  const elapsed = (performance.now() - start) / 1000;
  const opsSec = iterations / elapsed;
  console.log(`Benchmark completed: ${iterations} iterations in ${elapsed.toFixed(4)}s (${opsSec.toFixed(2)} ops/sec)`);
}

runBenchmark();

