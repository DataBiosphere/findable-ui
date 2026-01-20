"""Configuration for LLM agents (OpenAI)."""

import os
from typing import Optional


class LLMConfig:
    """Configuration for OpenAI LLM integration.

    Reads from environment variables with defaults for development.
    """

    def __init__(
        self,
        api_key: Optional[str] = None,
        model: str = "gpt-4o-mini",
    ):
        """Initialize LLM configuration.

        Args:
            api_key: OpenAI API key. If None, reads from OPENAI_API_KEY env var.
            model: OpenAI model to use (default: gpt-4o-mini).
        """
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.model = model

        # Cost tracking (prices per million tokens as of Jan 2025)
        self.input_price_per_million = 0.150  # $0.15 per 1M input tokens
        self.output_price_per_million = 0.600  # $0.60 per 1M output tokens

    def estimate_cost(self, input_tokens: int, output_tokens: int) -> float:
        """Estimate cost in USD for a given token usage.

        Args:
            input_tokens: Number of input tokens.
            output_tokens: Number of output tokens.

        Returns:
            Estimated cost in USD.
        """
        input_cost = (input_tokens / 1_000_000) * self.input_price_per_million
        output_cost = (output_tokens / 1_000_000) * self.output_price_per_million
        return input_cost + output_cost
