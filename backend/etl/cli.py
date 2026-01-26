"""
CLI for running the ETL pipeline.

Usage:
    python -m etl --scope anvil --full-refresh
    python -m etl --scope anvil --entity donors
    python -m etl --scope anvil --dry-run
"""

import argparse
import logging
import os
import sys
from pathlib import Path

# Add parent directories to path
sys.path.insert(0, str(Path(__file__).parent.parent / "api"))
sys.path.insert(0, str(Path(__file__).parent.parent))

from etl.pipeline import ETLPipeline


def setup_logging(verbose: bool = False) -> None:
    """
    Configure logging.

    @param verbose - Enable debug logging if True.
    """
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(
        level=level,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[logging.StreamHandler()],
    )


def main() -> int:
    """
    Main CLI entry point.

    @returns Exit code (0 for success, 1 for error).
    """
    parser = argparse.ArgumentParser(
        description="ETL Pipeline for Generic Data Explorer"
    )

    parser.add_argument(
        "--scope",
        default="anvil",
        help="Configuration scope (default: anvil)",
    )

    parser.add_argument(
        "--entity",
        help="Specific entity to process (omit for all entities)",
    )

    parser.add_argument(
        "--full-refresh",
        action="store_true",
        help="Delete and recreate indices before loading",
    )

    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Run pipeline without writing to OpenSearch",
    )

    parser.add_argument(
        "--max-pages",
        type=int,
        help="Maximum pages to fetch (for testing)",
    )

    parser.add_argument(
        "--opensearch-host",
        default=os.getenv("OPENSEARCH_HOST", "localhost"),
        help="OpenSearch host (default: localhost)",
    )

    parser.add_argument(
        "--opensearch-port",
        type=int,
        default=int(os.getenv("OPENSEARCH_PORT", "9200")),
        help="OpenSearch port (default: 9200)",
    )

    parser.add_argument(
        "--enrichment-file",
        type=Path,
        help="Path to meta-disco enrichment JSON file",
    )

    parser.add_argument(
        "-v",
        "--verbose",
        action="store_true",
        help="Enable verbose logging",
    )

    # Index management commands
    subparsers = parser.add_subparsers(dest="command", help="Commands")

    # create-indices command
    create_parser = subparsers.add_parser(
        "create-indices",
        help="Create OpenSearch indices from config",
    )
    create_parser.add_argument(
        "--recreate",
        action="store_true",
        help="Delete and recreate existing indices",
    )

    # delete-indices command
    subparsers.add_parser(
        "delete-indices",
        help="Delete all OpenSearch indices",
    )

    # list-indices command
    subparsers.add_parser(
        "list-indices",
        help="List OpenSearch indices",
    )

    args = parser.parse_args()
    setup_logging(args.verbose)

    logger = logging.getLogger(__name__)

    try:
        with ETLPipeline(
            scope=args.scope,
            opensearch_host=args.opensearch_host,
            opensearch_port=args.opensearch_port,
            enrichment_file=args.enrichment_file,
            dry_run=args.dry_run,
        ) as pipeline:

            if args.command == "create-indices":
                logger.info("Creating indices...")
                results = pipeline.setup_indices(recreate=args.recreate)
                for name, created in results.items():
                    status = "created" if created else "already exists"
                    print(f"  {name}: {status}")
                return 0

            elif args.command == "delete-indices":
                logger.info("Deleting indices...")
                manager = pipeline._get_index_manager()
                results = manager.delete_all_indices(args.scope)
                for name, deleted in results.items():
                    status = "deleted" if deleted else "did not exist"
                    print(f"  {name}: {status}")
                return 0

            elif args.command == "list-indices":
                manager = pipeline._get_index_manager()
                indices = manager.list_indices("anvil_*")
                if indices:
                    print("Indices:")
                    for idx in sorted(indices):
                        stats = manager.get_index_stats(idx)
                        print(f"  {idx}: {stats.get('doc_count', 0)} docs")
                else:
                    print("No anvil_* indices found")
                return 0

            else:
                # Run full pipeline
                logger.info("Running ETL pipeline...")
                results = pipeline.run(
                    entity=args.entity,
                    max_pages=args.max_pages,
                    full_refresh=args.full_refresh,
                )

                print("\nETL Pipeline Results:")
                print(f"  Scope: {results['scope']}")
                print(f"  Hits processed: {results['hits_processed']}")
                print(f"  Dry run: {results['dry_run']}")
                print("\n  Entities:")
                for entity, stats in results["entities"].items():
                    loaded = stats.get("loaded", {})
                    print(
                        f"    {entity}: {stats['records']} records "
                        f"(success: {loaded.get('success', 0)}, "
                        f"failed: {loaded.get('failed', 0)})"
                    )

                return 0

    except Exception as e:
        logger.error(f"ETL pipeline failed: {e}", exc_info=True)
        return 1


if __name__ == "__main__":
    sys.exit(main())
