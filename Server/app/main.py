from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
from app.models import Base
from app.database import engine
from app.routers import games
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(engine)
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"]
)
app.include_router(games.router, prefix="/games", tags=["Games"])
