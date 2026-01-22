from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import or_, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from todolist.database import get_session
from todolist.models import User
from todolist.schemas import (
    FilterPage,
    UserList,
    UserPublic,
    UserSchema,
)
from todolist.security import (
    get_current_user,
    get_password_hash,
)

router = APIRouter(prefix='/users', tags=['users'])
Session = Annotated[AsyncSession, Depends(get_session)]
CurrentUser = Annotated[User, Depends(get_current_user)]
FilterUsers = Annotated[FilterPage, Query()]


@router.post('/', status_code=HTTPStatus.CREATED, response_model=UserPublic)
async def create_user(user: UserSchema, session: Session):
    db_user = await session.scalar(
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

    await session.commit()
    await session.refresh(db_user)

    return db_user


@router.get('/', status_code=HTTPStatus.OK, response_model=UserList)
async def list_users(
    session: Session,
    current_user: CurrentUser,
    filter_users: FilterUsers,
):
    result = await session.scalars(
        select(User).offset(filter_users.skip).limit(filter_users.limit)
    )
    users = result.all()

    return {'users': users}


@router.get('/{user_id}', status_code=HTTPStatus.OK, response_model=UserPublic)
async def read_user(
    user_id: int,
    session: Session,
    current_user: CurrentUser,
):
    user_db = await session.scalar(select(User).where(User.id == user_id))

    return user_db


@router.put('/{user_id}', status_code=HTTPStatus.OK, response_model=UserPublic)
async def update_user(
    user_id: int,
    user: UserSchema,
    session: Session,
    current_user: CurrentUser,
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
        await session.commit()
        await session.refresh(current_user)

        return current_user

    except IntegrityError:
        raise HTTPException(
            status_code=HTTPStatus.CONFLICT,
            detail='Esse Username ou email já existe',
        )


@router.delete(
    '/{user_id}',
    status_code=HTTPStatus.OK,
)  # response_model=Message
async def delete_user(
    user_id: int,
    session: Session,
    current_user: CurrentUser,
):
    if current_user.id != user_id:
        raise HTTPException(
            status_code=HTTPStatus.FORBIDDEN,
            detail='Você não tem permição',
        )

    await session.delete(current_user)
    await session.commit()

    return {'Message': 'Usúario deletado'}
