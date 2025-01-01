from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
from models import Base
from database import engine
from routers import games
Base.metadata.create_all(engine)
app = FastAPI()


app.include_router(games.router, prefix="/games", tags=["Games"])
