from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker




connection_string = "mssql+pymssql://sa:Basheppo%401234@localhost:1433/master"
engine = create_engine(connection_string)
SessionLocal = sessionmaker(bind=engine,autocommit=False,autoflush=False)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
