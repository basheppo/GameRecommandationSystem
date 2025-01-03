from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Game
from app.schemas import GameResponse
from sklearn.metrics.pairwise import cosine_distances
import numpy as np
import textdistance

router = APIRouter()

@router.get("/top-rated", response_model=list[GameResponse], status_code=status.HTTP_200_OK)
def get_top_rated_games(limit: int = 20, db: Session = Depends(get_db)):
    top_games = (
        db.query(Game)
        .order_by(Game.positive_ratings.desc())
        .limit(limit)
        .all()
    )
    if not top_games:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No top-rated games found")
    return top_games


@router.get('/search', response_model=list[GameResponse], status_code=status.HTTP_200_OK)
def get_search_results(query: str, db: Session = Depends(get_db)):
    all_games = db.query(Game).all()
    if not all_games:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No games found in the database")
    
    matched_games = []
    for game in all_games:
        distance = textdistance.levenshtein(game.name.lower(), query.lower())
        matched_games.append({
            "game": game,
            "distance": distance,
        })

    top_result = sorted(matched_games, key=lambda x: (x['distance']))
    top_10_results = top_result[:15]
    return [
        GameResponse(
            appid=game_data['game'].appid,
            name=game_data['game'].name,
            positive_ratings=game_data['game'].positive_ratings,
            price=game_data['game'].price,
            header_image=game_data['game'].header_image,
            negative_ratings=game_data['game'].negative_ratings,
            short_description=game_data['game'].short_description,
            genres=game_data['game'].genres,
        )
        for game_data in top_10_results
    ]


def str_to_array(string):
    str = string.strip('[]')
    val = np.fromstring(str, sep=',')
    val = val.reshape(1, -1)
    return val


@router.get('/recommand/{id}', status_code=status.HTTP_200_OK)
def get_recommandation(id: int, db: Session = Depends(get_db)):
    distances = []
    all_games = db.query(Game).all()
    choosed_game = db.query(Game).filter(Game.appid == id).first()
    if choosed_game:
        emb_val = str_to_array(choosed_game.embedding)
        emb_val = emb_val.reshape(1, -1)
        for game in all_games:
            distance = cosine_distances(emb_val, str_to_array(game.embedding))
            distance = distance[0][0]  # from (1,1) to 1
            distances.append((distance, game))
        
        sorted_distances = sorted(distances, key=lambda x: x[0])
        top_10_recoms = [
            GameResponse(
                appid=game.appid,
                name=game.name,
                positive_ratings=game.positive_ratings,
                price=game.price,
                header_image=game.header_image,
                negative_ratings=game.negative_ratings,
                short_description=game.short_description,
                genres=game.genres
            )
            for dist, game in sorted_distances[:10]
        ]
        return top_10_recoms
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Game not found")


@router.get("/{id}", response_model=GameResponse, status_code=status.HTTP_200_OK)
def get_game(id: int, db: Session = Depends(get_db)):
    game = db.query(Game).filter(Game.appid == id).first()
    if not game:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Game not found")
    return game
