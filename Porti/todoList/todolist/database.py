from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine

from todolist.settings import Settings

engine = create_async_engine(Settings().DATABASE_URL)


async def get_session():  # pragma: no cover
    async with AsyncSession(engine, expire_on_commit=False) as session:
        yield session


# yeild em vez de return é usado pqele faz uma condição de parada
# tipo não fecha a sessão enquanto a terfea n terminar
