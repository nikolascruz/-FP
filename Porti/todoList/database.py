from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from todolist.settings import Settings

engine = create_engine(Settings().DATABASE_URL)


def get_session():
    with Session(engine) as session:
        yield session


# yeild em vez de return é usado pqele faz uma condição de parada
