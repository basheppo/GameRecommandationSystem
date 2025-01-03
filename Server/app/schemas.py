from pydantic import BaseModel
from typing import List

class GameResponse(BaseModel):
    appid: int
    name: str
    positive_ratings:int
    price : float
    header_image:str
    positive_ratings:int
    negative_ratings:int
    short_description:str
    genres:str

    class Config:
        from_attributes = True
class GameEmbeddingResponse(BaseModel):
    appid: int
    name: str
    embedding: str 


    class Config:
        from_attributes = True