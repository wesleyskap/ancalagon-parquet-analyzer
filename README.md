# ancalagon-parquet-analyzer

Zero-dependency Node.js/TypeScript library designed to perform deep inspection, verification, compression scoring, and health analysis of Parquet files.

---

## Overview and Features

- **Parquet Header & Footer Magic Inspector**: Deep verification of magic bytes (`PAR1`) at header and footer offsets.
- **Thrift Compact Metadata Decoder**: Native varint, zigzag, and field header parsing for Parquet schema definitions.
- **Column Compression Evaluator**: Detailed calculation of uncompressed vs compressed column sizes, ratio scoring, and encoding health (`PLAIN`, `RLE`, `DICTIONARY`).
- **Row Group Fragmentation Scoring**: Detect small, fragmented row groups (below 32MB) that penalize query performance.
- **Parquet Overall Health Score**: Comprehensive diagnostic report generating an overall health percentage score (0-100%).
- **Zero External Dependencies**: Built strictly using Node.js native `Buffer`, `node:zlib`, `node:fs`, `node:crypto`.

---

## Installation

```bash
npm install ancalagon-parquet-analyzer
```

---

## Usage Example

```typescript
import { ParquetAnalyzer } from "ancalagon-parquet-analyzer";

const fileBuffer = Buffer.from("PAR1...PAR1");
const analyzer = new ParquetAnalyzer();
const report = analyzer.analyzeBuffer(fileBuffer);

console.log(`Parquet Health Score: ${report.healthScore}%`);
console.log(`Total Row Groups: ${report.rowGroupCount}`);
```

---

## License

MIT License.
