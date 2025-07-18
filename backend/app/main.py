from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust if your frontend runs on a different origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from .routers import resonator, attenuation
app.include_router(resonator.router)
app.include_router(attenuation.router)



