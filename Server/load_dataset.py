import pandas as pd
from sqlalchemy import create_engine

df = pd.read_csv('/home/basheppo/Github/GameRecommandationSystem/Data/final_dataset.csv')

connection_string = "mssql+pymssql://sa:Basheppo%401234@localhost:1433/master"
print(df.columns)

engine = create_engine(connection_string)
df.to_sql('games', con=engine, if_exists='replace', index=False)
