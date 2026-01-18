from http import HTTPStatus

from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import or_, select
from sqlalchemy.exc import IntegrityError

from database import get_session
from todolist.models import User
from todolist.schemas import Token, UserList, UserPublic, UserSchema
from todolist.security import (
    create_access_token,
    get_current_user,
    get_password_hash,
    verify_password,
)

app = FastAPI(
    title='Minha API de To do List',
    swagger_ui_parameters={
        'syntaxHighlight': {'theme': 'tomorrow-night'}  # Altera o tema
    },
)


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
        username=user.username,
        email=user.email,
        password=get_password_hash(user.password),
    )

    session.add(db_user)

    session.commit()
    session.refresh(db_user)

    return db_user


@app.get('/users/', status_code=HTTPStatus.OK, response_model=UserList)
def list_users(
    session=Depends(get_session),
    skip: int = 0,
    limit: int = 10,
    current_user=Depends(get_current_user),
):
    users = session.scalars(select(User).offset(skip).limit(limit)).all()

    return {'users': users}


@app.put(
    '/users/{user_id}', status_code=HTTPStatus.OK, response_model=UserPublic
)
def update_user(
    user_id: int,
    user: UserSchema,
    session=Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    if current_user.id != user_id:
        raise HTTPException(
            status_code=HTTPStatus.FORBIDDEN, detail='Você não tem permição'
        )

    try:
        current_user.username = user.username
        current_user.email = user.email
        current_user.password = get_password_hash(user.password)
        current_user.id = user_id

        session.add(current_user)
        session.commit()
        session.refresh(current_user)

        return current_user

    except IntegrityError:
        raise HTTPException(
            status_code=HTTPStatus.CONFLICT,
            detail='Esse Username ou email já existe',
        )


@app.delete(
    '/users/{user_id}',
    status_code=HTTPStatus.OK,
)  # response_model=Message
def delete_user(
    user_id: int,
    session=Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    if current_user.id != user_id:
        raise HTTPException(
            status_code=HTTPStatus.FORBIDDEN,
            detail='Você não tem permição',
        )

    session.delete(current_user)
    session.commit()

    return {'Message': 'Usúario deletado'}


@app.get(
    '/users/{user_id}', status_code=HTTPStatus.OK, response_model=UserPublic
)
def read_user(
    user_id: int,
    session=Depends(get_session),
    current_user=Depends(get_current_user),
):
    user_db = session.scalar(select(User).where(User.id == user_id))

    return user_db


@app.post('/login', response_model=Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session=Depends(get_session),
):
    user = session.scalars(
        select(User).where(User.email == form_data.username)
    ).first()

    if not user:
        raise HTTPException(
            status_code=HTTPStatus.UNAUTHORIZED,
            detail='Email ou senha incorreto',
        )

    if not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=HTTPStatus.UNAUTHORIZED,
            detail='Email ou senha incorreto',
        )
    access_token = create_access_token(data={'sub': user.email})
    return {'access_token': access_token, 'token_type': 'Bearer'}
