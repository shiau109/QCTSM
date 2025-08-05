from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8009"],  # Adjust if your frontend runs on a different origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.routers.dr import router as router_dr
app.include_router(router_dr, prefix="/dr")
