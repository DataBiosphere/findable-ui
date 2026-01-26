"""
Entry point for running ETL as a module.

Usage:
    python -m etl --help
    python -m etl --scope anvil --dry-run
"""

from etl.cli import main

if __name__ == "__main__":
    main()
