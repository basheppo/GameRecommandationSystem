from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
from app.models import Base
from app.database import engine
from app.routers import games
Base.metadata.create_all(engine)
app = FastAPI()


app.include_router(games.router, prefix="/games", tags=["Games"])
