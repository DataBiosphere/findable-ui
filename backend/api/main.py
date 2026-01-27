from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from controllers.chat_controller import router as chat_router
from controllers.explore_controller import router as explore_router
from controllers.facets_controller import router as facets_router
from controllers.health_controller import router as health_router

# Load environment variables from .env file in api directory
load_dotenv()

app = FastAPI(title="Findable API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register controllers
app.include_router(health_router)
app.include_router(facets_router)
app.include_router(explore_router)
app.include_router(chat_router)
