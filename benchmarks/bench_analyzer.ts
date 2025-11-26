import { ParquetAnalyzer } from "../src/index.js";

function runBenchmark() {
  const analyzer = new ParquetAnalyzer();
  const mockBuffer = Buffer.concat([Buffer.from("PAR1"), Buffer.alloc(100), Buffer.from("PAR1")]);
  analyzer.analyzeBuffer(mockBuffer);
}
runBenchmark();
// Large buffer memory allocation scans
