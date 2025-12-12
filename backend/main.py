from fastapi import FastAPI

from backend.controllers.facets_controller import router as facets_router


app = FastAPI(title="Findable API")

# Register controller(s)
app.include_router(facets_router)
