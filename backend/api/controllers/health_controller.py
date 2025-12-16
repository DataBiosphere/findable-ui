"""Health check endpoint."""

from fastapi import APIRouter
from typing import Dict

router = APIRouter(tags=["health"])


@router.get("/health")
def health_check() -> Dict[str, str]:
    """
    Basic health check - returns OK if server is running.
    """
    return {"status": "ok"}
