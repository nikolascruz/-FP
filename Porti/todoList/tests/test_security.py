from http import HTTPStatus

from jwt import decode

from todolist.security import create_access_token


def test_jwt(settings):
    data = {'test': 'test'}
    token = create_access_token(data)

    decoded = decode(token, settings.SECRET_KEY, settings.ALGORITHM)

    assert decoded['test'] == data['test']
    assert 'exp' in decoded


def test_jwt_invalid_token(client):
    response = client.delete(
        'users/1',
        headers={'Authorization': 'Bearer token-invalid'},
    )

    assert response.status_code == HTTPStatus.UNAUTHORIZED
    assert response.json() == {
        'detail': 'Não foi possivel validar a credêncial'
    }


def test_jwt_invalid_user(client, user, token):
    data = {'no-email': 'test'}
    token = create_access_token(data)

    response = client.delete(
        f'users/{user.id}',
        headers={'Authorization': f'Bearer {token}'},
    )

    assert response.status_code == HTTPStatus.UNAUTHORIZED
    assert response.json() == {
        'detail': 'Não foi possivel validar a credêncial'
    }


def test_jwt_invalid_email(client, user, token):
    user.email = 'bob@example.com'
    response = client.delete(
        f'users/{user.id}',
        headers={'Authorization': f'Bearer {token}'},
    )

    assert response.status_code == HTTPStatus.UNAUTHORIZED
    assert response.json() == {
        'detail': 'Não foi possivel validar a credêncial'
    }
