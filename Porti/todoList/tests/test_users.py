from http import HTTPStatus

import pytest

from todolist.schemas import UserPublic


def test_create_user(client):
    response = client.post(
        '/users/',
        json={
            'username': 'alice',
            'email': 'alice@example.com',
            'password': 'secret',
        },
    )

    assert response.status_code == HTTPStatus.CREATED
    assert response.json() == {
        'id': 1,
        'email': 'alice@example.com',
        'username': 'alice',
    }


def test_create_user_ERROR_username(client):
    client.post(
        '/users/',
        json={
            'username': 'alice',
            'email': 'alice@example.com',
            'password': 'secret',
        },
    )

    response = client.post(
        '/users/',
        json={
            'username': 'alice',
            'email': 'carl@example.com',
            'password': 'secret',
        },
    )

    assert response.status_code == HTTPStatus.CONFLICT
    assert response.json() == {'detail': 'Esse Username já existe'}


def test_create_user_ERROR_email(client):
    client.post(
        '/users/',
        json={
            'username': 'alice',
            'email': 'alice@example.com',
            'password': 'secret',
        },
    )

    response = client.post(
        '/users/',
        json={
            'username': 'carl',
            'email': 'alice@example.com',
            'password': 'secret',
        },
    )

    assert response.status_code == HTTPStatus.CONFLICT
    assert response.json() == {'detail': 'Esse Email já existe'}


@pytest.mark.asyncio
async def test_read_users(client, user, token):
    user_schema = UserPublic.model_validate(user).model_dump()
    response = client.get(
        '/users/', headers={'Authorization': f'Bearer {token}'}
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {'users': [user_schema]}


@pytest.mark.asyncio
async def test_update_user(client, user, token):
    response = client.put(
        f'/users/{user.id}',
        json={
            'username': 'bob',
            'email': 'bob@example.com',
            'password': 'secret',
        },
        headers={'Authorization': f'Bearer {token}'},
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {
        'username': 'bob',
        'email': 'bob@example.com',
        'id': 1,
    }


@pytest.mark.asyncio
async def test_delete_user(client, user, token):
    response = client.delete(
        f'users/{user.id}',
        headers={'Authorization': f'Bearer {token}'},
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {'Message': 'Usúario deletado'}


@pytest.mark.asyncio
async def test_delete_user_FORBIDEN(client, other_user, token):
    response = client.delete(
        f'users/{other_user.id}',
        headers={'Authorization': f'Bearer {token}'},
    )

    assert response.status_code == HTTPStatus.FORBIDDEN
    assert response.json() == {'detail': 'Você não tem permição'}


@pytest.mark.asyncio
async def test_update_integrity_error(client, user, token):
    client.post(
        '/users/',
        json={
            'username': 'carl',
            'email': 'carl@example.com',
            'password': 'secret',
        },
    )
    response_update = client.put(
        f'/users/{user.id}',
        headers={'Authorization': f'Bearer {token}'},
        json={
            'username': 'bob',
            'email': 'carl@example.com',
            'password': 'secret',
        },
    )
    assert response_update.status_code == HTTPStatus.CONFLICT

    assert response_update.json() == {
        'detail': 'Esse Username ou email já existe'
    }


@pytest.mark.asyncio
async def test_read_user(client, user, token):
    response = client.get(
        f'users/{user.id}', headers={'Authorization': f'Bearer {token}'}
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {
        'username': user.username,
        'email': user.email,
        'id': user.id,
    }


@pytest.mark.asyncio
async def test_update_user_FORBIDEN(client, other_user, token):
    response = client.put(
        f'/users/{other_user.id}',
        headers={'Authorization': f'Bearer {token}'},
        json={
            'username': 'bob',
            'email': 'bob@example.com',
            'password': 'secret',
        },
    )

    assert response.status_code == HTTPStatus.FORBIDDEN
    assert response.json() == {'detail': 'Você não tem permição'}
