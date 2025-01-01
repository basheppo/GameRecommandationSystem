import pandas as pd
from sqlalchemy import create_engine
import os
df = pd.read_csv('/data/final_dataset.csv')
DATABASE_URL = os.getenv('DATABASE_URL')
engine = create_engine(DATABASE_URL)
df.to_sql('games', con=engine, if_exists='replace', index=False)
