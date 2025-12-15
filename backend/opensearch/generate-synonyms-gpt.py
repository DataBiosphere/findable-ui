#!/usr/bin/env python3
"""
Generate synonyms using OpenAI GPT-4o-mini.

This script:
1. Identifies concepts with few/no synonyms
2. Uses GPT-4o-mini to generate domain-appropriate synonyms
3. Tracks cost and usage
4. Saves enriched concepts
"""

import json
import os
import time
from typing import List, Dict
from openai import OpenAI


class SynonymGenerator:
    """Generate synonyms using GPT-4o-mini."""

    def __init__(self, api_key: str = None):
        """Initialize OpenAI client."""
        self.client = OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))
        self.model = "gpt-4o-mini"

        # Track costs
        self.stats = {
            "total_concepts": 0,
            "processed": 0,
            "skipped": 0,
            "failed": 0,
            "total_input_tokens": 0,
            "total_output_tokens": 0,
            "estimated_cost": 0.0
        }

        # Pricing per million tokens
        self.input_price = 0.150  # $0.15 per 1M tokens
        self.output_price = 0.600  # $0.60 per 1M tokens

    def should_generate_synonyms(self, concept: Dict, min_synonyms: int = 2) -> bool:
        """Check if concept needs synonym generation."""
        synonyms = concept.get('synonyms', [])

        # Skip if already has enough synonyms
        if len(synonyms) >= min_synonyms:
            return False

        # Skip if term is just an ID without enrichment
        if concept['name'] == concept['term'] and ':' in concept['term']:
            return False

        return True

    def generate_synonyms(self, term: str, name: str, facet_name: str) -> List[str]:
        """
        Generate synonyms using GPT-4o-mini.

        Args:
            term: The canonical term
            name: Human-readable name
            facet_name: Facet this belongs to (for context)

        Returns:
            List of synonyms
        """
        # Build context-aware prompt
        context = self._get_facet_context(facet_name)

        prompt = f"""Generate 3-5 common synonyms or alternative names for this term.

Term: {name}
Context: {context}

Requirements:
- Return ONLY a JSON array of strings
- Include common abbreviations, alternative spellings, and variations
- Do NOT include the original term
- Medical/scientific terms should include standard abbreviations

Example output: ["T2D", "Type II Diabetes", "DM2", "NIDDM"]

Synonyms:"""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a biomedical terminology expert. Generate accurate synonyms for medical and scientific terms."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.3,  # Low temperature for consistency
                max_tokens=100,
                response_format={"type": "json_object"}
            )

            # Track usage
            usage = response.usage
            self.stats["total_input_tokens"] += usage.prompt_tokens
            self.stats["total_output_tokens"] += usage.completion_tokens

            # Calculate cost
            input_cost = (usage.prompt_tokens / 1_000_000) * self.input_price
            output_cost = (usage.completion_tokens / 1_000_000) * self.output_price
            self.stats["estimated_cost"] += (input_cost + output_cost)

            # Parse response
            content = response.choices[0].message.content
            result = json.loads(content)

            # Handle different response formats
            if isinstance(result, dict):
                synonyms = result.get('synonyms', result.get('terms', []))
            else:
                synonyms = result

            return [s.strip() for s in synonyms if s.strip()]

        except Exception as e:
            print(f"  ⚠ Error generating synonyms for '{name}': {e}")
            self.stats["failed"] += 1
            return []

    def _get_facet_context(self, facet_name: str) -> str:
        """Get context description for facet."""
        contexts = {
            "diagnoses.disease": "This is a disease or medical condition",
            "diagnoses.phenotype": "This is a clinical phenotype or observable trait",
            "biosamples.anatomical_site": "This is an anatomical location or tissue type",
            "datasets.title": "This is a dataset or study name",
            "activities.assay_type": "This is a laboratory assay or experimental technique",
            "files.file_format": "This is a data file format",
            "donors.organism_type": "This is a species or organism type",
        }

        return contexts.get(facet_name, f"This is from the '{facet_name}' category")

    def process_concepts(
        self,
        concepts: List[Dict],
        batch_size: int = 10,
        max_concepts: int = None
    ) -> List[Dict]:
        """
        Process concepts and add synonyms.

        Args:
            concepts: List of concept dictionaries
            batch_size: Progress update frequency
            max_concepts: Limit processing (for testing)

        Returns:
            Updated concepts with synonyms
        """
        self.stats["total_concepts"] = len(concepts)

        if max_concepts:
            concepts = concepts[:max_concepts]
            print(f"Limited to first {max_concepts} concepts for testing")

        print(f"Processing {len(concepts)} concepts...")
        print(f"Model: {self.model}")
        print()

        for i, concept in enumerate(concepts):
            if not self.should_generate_synonyms(concept):
                self.stats["skipped"] += 1
                continue

            # Generate synonyms
            term = concept['term']
            name = concept['name']
            facet_name = concept['facet_name']

            new_synonyms = self.generate_synonyms(term, name, facet_name)

            if new_synonyms:
                # Combine with existing synonyms
                existing = set(concept.get('synonyms', []))
                all_synonyms = existing | set(new_synonyms) | {term}
                concept['synonyms'] = sorted(list(all_synonyms))

                self.stats["processed"] += 1

            # Progress update
            if (i + 1) % batch_size == 0 or (i + 1) == len(concepts):
                self._print_progress(i + 1, len(concepts))

            # Rate limiting (be nice to API)
            time.sleep(0.1)

        return concepts

    def _print_progress(self, current: int, total: int):
        """Print progress with cost estimate."""
        print(f"  Progress: {current}/{total} "
              f"(Processed: {self.stats['processed']}, "
              f"Skipped: {self.stats['skipped']}, "
              f"Cost: ${self.stats['estimated_cost']:.4f})")

    def print_summary(self):
        """Print final statistics."""
        print("\n=== SYNONYM GENERATION SUMMARY ===")
        print(f"Total concepts: {self.stats['total_concepts']}")
        print(f"Processed: {self.stats['processed']}")
        print(f"Skipped (already have synonyms): {self.stats['skipped']}")
        print(f"Failed: {self.stats['failed']}")
        print()
        print(f"Input tokens: {self.stats['total_input_tokens']:,}")
        print(f"Output tokens: {self.stats['total_output_tokens']:,}")
        print(f"Total tokens: {self.stats['total_input_tokens'] + self.stats['total_output_tokens']:,}")
        print()
        print(f"💰 Estimated cost: ${self.stats['estimated_cost']:.4f}")


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Generate synonyms using GPT-4o-mini")
    parser.add_argument("--input", default="concepts-fully-enriched.json",
                       help="Input concepts file")
    parser.add_argument("--output", default="concepts-with-synonyms.json",
                       help="Output file")
    parser.add_argument("--limit", type=int,
                       help="Limit to N concepts (for testing)")
    parser.add_argument("--api-key",
                       help="OpenAI API key (or set OPENAI_API_KEY env var)")

    args = parser.parse_args()

    # Check for API key
    api_key = args.api_key or os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("❌ Error: OpenAI API key required")
        print("Set OPENAI_API_KEY environment variable or use --api-key")
        print("\nGet your API key at: https://platform.openai.com/api-keys")
        return

    # Read concepts
    print(f"Reading concepts from {args.input}...")
    with open(args.input, 'r') as f:
        concepts = json.load(f)

    # Generate synonyms
    generator = SynonymGenerator(api_key=api_key)
    updated_concepts = generator.process_concepts(
        concepts,
        max_concepts=args.limit
    )

    # Save
    print(f"\nWriting concepts with synonyms to {args.output}...")
    with open(args.output, 'w') as f:
        json.dump(updated_concepts, f, indent=2)

    # Print summary
    generator.print_summary()

    print(f"\n✓ Concepts with synonyms saved to {args.output}")
    print(f"\nTo load into OpenSearch:")
    print(f"  python load-concepts.py --file {args.output} --clear")


if __name__ == "__main__":
    main()
