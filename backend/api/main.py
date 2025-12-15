from dotenv import load_dotenv
from fastapi import FastAPI

from controllers.facets_controller import router as facets_router
from controllers.health_controller import router as health_router

# Load environment variables from .env file in api directory
load_dotenv()

app = FastAPI(title="Findable API")

# Register controllers
app.include_router(health_router)
app.include_router(facets_router)
