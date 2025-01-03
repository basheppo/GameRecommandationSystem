import pandas as pd
from sqlalchemy import create_engine
import os
df = pd.read_csv('/data/final_dataset.csv')
DATABASE_URL = os.getenv('DATABASE_URL')
#df = pd.read_csv('/home/basheppo/Desktop/Github/GameRecommandationSystem/Datasets/final_dataset.csv')
#DATABASE_URL = 'mssql+pymssql://sa:Badr1998!@localhost:1433/master'
engine = create_engine(DATABASE_URL)
df.to_sql('games', con=engine, if_exists='replace', index=False)
