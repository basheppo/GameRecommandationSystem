from pydantic import BaseModel

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
        orm_mode = True
