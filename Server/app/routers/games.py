from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Game
from app.schemas import GameResponse
import textdistance
router = APIRouter()

@router.get("/top-rated", response_model=list[GameResponse])
def get_top_rated_games(limit: int = 10, db: Session = Depends(get_db)):

    top_games = (
        db.query(Game)
        .order_by(Game.positive_ratings.desc())
        .limit(limit)
        .all()
    )
    return top_games

@router.get('/search',response_model=list[GameResponse])
def get_search_results(game_name:str,db: Session = Depends(get_db)):
    all_games = db.query(Game).all()
    matched_games = []
    for game in all_games:
        distance = textdistance.levenshtein(game.name.lower(), game_name.lower())
        matched_games.append({
            "game": game,
            "distance": distance,
        })
        
    top_result = sorted(matched_games, key=lambda x: (x['distance']))
    print(top_result)
    top_10_results = top_result[:10]
    return [
        GameResponse(
            appid=game_data['game'].appid,
            name=game_data['game'].name,
            positive_ratings=game_data['game'].positive_ratings,
            price=game_data['game'].price,
            header_image=game_data['game'].header_image,
            negative_ratings=game_data['game'].negative_ratings,
            short_description=game_data['game'].short_description,
            genres=game_data['game'].genres
        ) 
        for game_data in top_10_results
    ]

@router.get('/recommandations',response_model=list[GameResponse])
def get_recommandation(limit:int=6,db: Session = Depends(get_db)):
    pass