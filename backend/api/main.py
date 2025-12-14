from fastapi import FastAPI

from controllers.facets_controller import router as facets_router
from controllers.health_controller import router as health_router


app = FastAPI(title="Findable API")

# Register controllers
app.include_router(health_router)
app.include_router(facets_router)
