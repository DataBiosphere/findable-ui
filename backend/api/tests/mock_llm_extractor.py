"""Mock LLM mention extractor for testing without API calls."""
from typing import List, Dict
import re

from services.normalization_service import Mention


class MockLLMMentionExtractor:
    """Mock LLM extractor using pattern matching instead of real API calls.

    Simulates the Pydantic AI LLM behavior by matching patterns in queries.
    Useful for testing without incurring API costs or requiring API keys.
    """

    # Patterns for recognizing mentions (pattern, mention_text, facet_name)
    PATTERNS = [
        # Diseases/Diagnoses
        (r"\bdiabetes\b", "diabetes", "Diagnosis"),
        (r"\bdiabtes\b", "diabtes", "Diagnosis"),  # Typo
        (r"\bcancer\b", "cancer", "Diagnosis"),
        (r"\bals\b", "als", "Diagnosis"),
        (r"\btype\s+2\s+diabetes\b", "type 2 diabetes", "Diagnosis"),
        # Ethnicity
        (r"\blatino\b", "latino", "Reported Ethnicity"),
        (r"\bhispanic\b", "hispanic", "Reported Ethnicity"),
        (r"\basian\b", "asian", "Reported Ethnicity"),
        (r"\bafrican\s+american\b", "african american", "Reported Ethnicity"),
        # File formats
        (r"\bbam\s+files?\b", "bam", "File Format"),
        (r"\bbam\b", "bam", "File Format"),
        (r"\bvcf\b", "vcf", "File Format"),
        (r"\bcram\b", "cram", "File Format"),
        (r"\bfastq\b", "fastq", "File Format"),
        # Anatomical sites
        (r"\bbrain\s+tissue\b", "brain", "Anatomical Site"),
        (r"\bbrain\b", "brain", "Anatomical Site"),
        (r"\bblood\b", "blood", "Anatomical Site"),
        (r"\bliver\b", "liver", "Anatomical Site"),
        (r"\bheart\b", "heart", "Anatomical Site"),
        # Biosample types
        (r"\btissue\b", "tissue", "BioSample Type"),
        (r"\bcell\s+line\b", "cell line", "BioSample Type"),
        # Sex
        (r"\bmale\s+patients?\b", "male", "Phenotypic Sex"),
        (r"\bmale\b", "male", "Phenotypic Sex"),
        (r"\bfemale\s+patients?\b", "female", "Phenotypic Sex"),
        (r"\bfemale\b", "female", "Phenotypic Sex"),
        # Data modality
        (r"\bgenomic\b", "genomic", "Data Modality"),
        (r"\btranscriptomic\b", "transcriptomic", "Data Modality"),
        # Organism
        (r"\bhuman\b", "human", "Organism Type"),
        (r"\bmouse\b", "mouse", "Organism Type"),
        # Unmatched/unknown terms
        (r"\bpublic\b", "public", "unmatched"),
        (r"\bopen\b", "open", "unmatched"),
        (r"\bfoobar\b", "foobar", "unmatched"),
        (r"\bfoobaz\b", "foobaz", "unmatched"),
        (r"\bunknown_term_xyz\b", "unknown_term_xyz", "unmatched"),
        # Common non-facet words (patients, with, for, etc.) -> ignore
    ]

    def __init__(self):
        """Initialize the mock extractor."""
        self.stats = {
            "total_queries": 0,
            "total_input_tokens": 0,
            "total_output_tokens": 0,
            "total_cost": 0.0,
        }

    def extract_mentions(self, query: str) -> List[Mention]:
        """Extract mentions using pattern matching.

        Args:
            query: Natural language query string.

        Returns:
            List of Mention objects extracted from the query.
        """
        if not query or not query.strip():
            return []

        # Update stats (simulate token usage)
        self.stats["total_queries"] += 1
        self.stats["total_input_tokens"] += len(query.split())
        self.stats["total_output_tokens"] += 10  # Mock estimate

        # Extract mentions using patterns
        mentions = []
        query_lower = query.lower()
        seen = set()  # Track seen (text, facet) pairs to avoid duplicates

        for pattern, mention_text, facet in self.PATTERNS:
            if re.search(pattern, query_lower):
                # Avoid duplicates
                key = (mention_text, facet)
                if key not in seen:
                    mentions.append(Mention(text=mention_text, facet=facet))
                    seen.add(key)

        return mentions

    def get_stats(self) -> Dict:
        """Get usage statistics.

        Returns:
            Dict with query count and mock token usage.
        """
        return self.stats.copy()

    def reset_stats(self) -> None:
        """Reset usage statistics."""
        self.stats = {
            "total_queries": 0,
            "total_input_tokens": 0,
            "total_output_tokens": 0,
            "total_cost": 0.0,
        }
