from sqlalchemy import Column, Integer, String, Float, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()



class Game(Base):
    __tablename__ = 'games'

    appid = Column(Integer, primary_key=True)  
    name = Column(String(255), nullable=False)
    release_date = Column(String(50), nullable=True)
    english = Column(Integer, nullable=False)  
    developer = Column(String(255), nullable=True)
    publisher = Column(String(255), nullable=True)
    platforms = Column(String(255), nullable=True)
    required_age = Column(Integer, nullable=False)
    categories = Column(Text, nullable=True)
    genres = Column(Text, nullable=True)
    steamspy_tags = Column(Text, nullable=True)
    achievements = Column(Integer, nullable=True)
    positive_ratings = Column(Integer, nullable=True)
    negative_ratings = Column(Integer, nullable=True)
    average_playtime = Column(Integer, nullable=True)
    median_playtime = Column(Integer, nullable=True)
    owners = Column(String(50), nullable=True)
    price = Column(Float, nullable=True)
    p_n_rating_ratio = Column(Float, nullable=True)
    price_category = Column(String(50), nullable=True)
    header_image = Column(String(255), nullable=True)
    screenshots = Column(Text, nullable=True)
    background = Column(String(255), nullable=True)
    movies = Column(Text, nullable=True)
    detailed_description = Column(Text, nullable=True)
    about_the_game = Column(Text, nullable=True)
    short_description = Column(Text, nullable=True)
    own_description = Column(Text, nullable=True)
    min_owners = Column(Integer, nullable=True)
    embedding = Column(Text, nullable=False) 
