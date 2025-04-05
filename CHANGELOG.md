# Black Atom Core Changelog

All notable changes to the Black Atom Core will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Collection-based templates support for all adapters
- Standardized label system across all repositories
- Added script for label standardization

### Changed
- Simplified adapter configuration schema to only support collection-based templates
- Improved logging in template processing to reduce verbosity
- Updated adapter-template to use collection-based approach
- Updated ADAPTER_DEVELOPMENT.md documentation

### Removed
- Removed support for legacy per-theme template configuration

## [0.1.0] - 2025-04-01

### Added
- Initial release of Black Atom Core
- Support for multiple theme collections (jpn, stations, terra, crbn)
- Basic adapter functionality with per-theme templates
- CLI commands for generating theme files
- Watch mode for development