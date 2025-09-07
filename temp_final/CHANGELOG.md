# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-05-06

### Added - 2026-05-06
- Finalized v1.2.0 release documentation and page index usage guides.
- Performance benchmark suite updated for page index and dictionary scorer overhead in `benchmarks/bench_analyzer.ts`.

### Added - 2026-04-27
- DictionaryScorer module in `src/dictionary-scorer.ts` evaluating cardinality ratios and byte savings.
- Unit test suite for dictionary encoding efficiency in `test/dictionary-scorer.test.ts`.

### Added - 2026-04-14
- PageIndexAnalyzer in `src/page-index-analyzer.ts` with min/max page statistics and data skipping efficiency calculations.
- Test suite for Page Index analysis in `test/page-index-analyzer.test.ts`.

## [1.1.0] - 2026-03-12

### Added - 2026-03-12
- Integrated BloomFilterInspector into main `ParquetAnalyzer` diagnostic pipeline.
- BloomFilter documentation and release tagging for v1.1.0.

### Added - 2026-02-10
- Theoretical false-positive rate calculation for `BLOCK_SPLIT_BLOOM_FILTER`.
- Test suite in `test/bloom-filter-inspector.test.ts`.

### Added - 2026-01-08
- Native Thrift `BloomFilterHeader` parser and `BloomFilterInspector` in `src/bloom-filter-inspector.ts`.

## [1.0.0] - 2025-12-08

### Added - 2025-12-08
- Finalized v1.0.0 documentation and release tags.
- Deep inspection CLI examples and edge case validation for corrupted metadata buffers.

### Added - 2025-12-04
- Community guidelines CONTRIBUTING.md and CODE_OF_CONDUCT.md.

### Added - 2025-11-28
- Performance benchmark suite for Parquet metadata inspection in benchmarks/bench_analyzer.ts.
- End-to-end ParquetAnalyzer diagnostic report generator in src/analyzer.ts.

### Added - 2025-11-21
- Overall Parquet Health Score calculator in src/health-score.ts.
- RowGroupAnalyzer fragmentation detection (<32MB threshold) in src/rowgroup-analyzer.ts.
- Column compression ratio evaluator in src/compression-evaluator.ts.

### Added - 2025-10-30
- SchemaInspector for nested field resolution in src/schema-inspector.ts.
- ThriftMetadataDecoder for Compact Protocol varint and zigzag integer parsing in src/thrift-decoder.ts.

### Added - 2025-09-30
- Custom exceptions ParquetAnalyzerError, InvalidHeaderError, CorruptedFooterError in src/errors.ts.
- ParquetHeaderInspector for magic bytes validation in src/header-inspector.ts.

### Added - 2025-09-07
- Initial project architecture and configuration files (README.md, .gitignore, LICENSE, VERSION, package.json, tsconfig.json).
