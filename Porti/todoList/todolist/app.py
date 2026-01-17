from http import HTTPStatus

from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from sqlalchemy import or_, select
from sqlalchemy.exc import IntegrityError

from database import get_session
from todolist.models import User
from todolist.schemas import UserList, UserPublic, UserSchema

app = FastAPI(
    title='Minha API de To do List',
    swagger_ui_parameters={
        'syntaxHighlight': {'theme': 'tomorrow-night'}  # Altera o tema
    },
)


@app.get('/')
def read_root():
    return {'message': 'Hello World!'}


@app.get('/hello', response_class=HTMLResponse)
def rota_hello():
    return """
    <html>
      <head>
        <title>Our Hello World!</title>
      </head>
      <body>
        <h1> Hello World </h1>
      </body>
    </html>
    """


@app.post('/users/', status_code=HTTPStatus.CREATED, response_model=UserPublic)
def create_user(user: UserSchema, session=Depends(get_session)):
    db_user = session.scalar(
        select(User).where(
            or_(User.username == user.username, User.email == user.email)
        )
    )

    if db_user:
        if db_user.username == user.username:
            raise HTTPException(
                status_code=HTTPStatus.CONFLICT,
                detail='Esse Username já existe',
            )
        elif db_user.email == user.email:
            raise HTTPException(
                status_code=HTTPStatus.CONFLICT, detail='Esse Email já existe'
            )

    db_user = User(
        username=user.username, email=user.email, password=user.password
    )

    session.add(db_user)

    session.commit()
    session.refresh(db_user)

    return db_user


@app.get('/users/', status_code=HTTPStatus.OK, response_model=UserList)
def read_users(
    session=Depends(get_session),
    skip: int = 0,
    limit: int = 10,
):
    users = session.scalars(select(User).offset(skip).limit(limit)).all()

    return {'users': users}


@app.put(
    '/users/{user_id}', status_code=HTTPStatus.OK, response_model=UserPublic
)
def update_user(user_id: int, user: UserSchema, session=Depends(get_session)):
    user_db = session.scalar(select(User).where(User.id == user_id))

    if not user_db:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Usuário não existente',
        )

    try:
        user_db.username = user.username
        user_db.email = user.email
        user_db.password = user.password
        user_db.id = user_id

        session.add(user_db)
        session.commit()
        session.refresh(user_db)

        return user_db

    except IntegrityError:
        raise HTTPException(
            status_code=HTTPStatus.CONFLICT,
            detail='Esse Username ou email já existe',
        )


@app.delete(
    '/users/{user_id}',
    status_code=HTTPStatus.OK,
)  # response_model=Message
def delete_user(user_id: int, session=Depends(get_session)):
    user_db = session.scalar(select(User).where(User.id == user_id))

    if not user_db:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Usuário não existente',
        )

    session.delete(user_db)
    session.commit()

    return {'Message': 'Usúario deletado'}


@app.get(
    '/users/{user_id}', status_code=HTTPStatus.OK, response_model=UserPublic
)
def read_user(user_id: int, session=Depends(get_session)):
    user_db = session.scalar(select(User).where(User.id == user_id))

    if not user_db:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND,
            detail='Usuário não existente',
        )

    return user_db
