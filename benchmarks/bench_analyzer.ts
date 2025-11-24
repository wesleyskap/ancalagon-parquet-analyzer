import { ParquetAnalyzer, ParquetHeaderInspector, ThriftMetadataDecoder } from "../src/index.js";

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
  }

  const elapsed = (performance.now() - start) / 1000;
  const opsSec = iterations / elapsed;
  console.log(`Benchmark completed: ${iterations} iterations in ${elapsed.toFixed(4)}s (${opsSec.toFixed(2)} ops/sec)`);
}

runBenchmark();
