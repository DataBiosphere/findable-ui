"""Configuration for the agentic facet selector."""

from pydantic import BaseModel, Field


class AgenticFacetConfig(BaseModel):
    """Configuration for the agentic facet selector.

    Attributes:
        enable_cot: Enable chain-of-thought verbose reasoning (default: True).
        max_iterations: Maximum tool calling iterations before stopping (default: 10).
        model: OpenAI model to use (default: gpt-4o-mini).
        capture_trace: Capture trace of tool calls for debugging (default: False).
        timeout: Request timeout in seconds (default: 60.0).
    """

    enable_cot: bool = Field(
        default=True,
        description="Enable chain-of-thought verbose reasoning",
    )
    max_iterations: int = Field(
        default=10,
        ge=1,
        le=50,
        description="Maximum tool calling iterations",
    )
    model: str = Field(
        default="gpt-4o-mini",
        description="OpenAI model to use",
    )
    capture_trace: bool = Field(
        default=False,
        description="Capture trace of tool calls for debugging",
    )
    timeout: float = Field(
        default=60.0,
        ge=1.0,
        le=300.0,
        description="Request timeout in seconds",
    )
