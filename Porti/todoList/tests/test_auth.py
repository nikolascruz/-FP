from http import HTTPStatus

from freezegun import freeze_time


def test_get_token(client, user):
    response = client.post(
        'auth/login',
        data={'username': user.email, 'password': user.clean_password},
    )

    token = response.json()

    assert response.status_code == HTTPStatus.OK
    assert token['token_type'] == 'Bearer'
    assert 'access_token' in token


def test_token_expired_after_time(client, user):
    with freeze_time('2026-01-22 18:00:00'):
        response = client.post(
            'auth/login',
            data={'username': user.email, 'password': user.clean_password},
        )

        assert response.status_code == HTTPStatus.OK
        token = response.json()['access_token']
    with freeze_time('2026-01-22 18:31:00'):
        response = client.put(
            f'users/{user.id}',
            headers={'Authorization': f'Bearer {token}'},
            json={
                'username': 'wrong',
                'email': 'wrong@example.com',
                'password': 'wrong',
            },
        )

        assert response.status_code == HTTPStatus.UNAUTHORIZED
        token = response.json() == {
            'detail': 'Não foi possivel validar a credêncial'
        }


def test_jwt_wrong_password(client, user):
    response = client.post(
        'auth/login',
        data={'username': user.email, 'password': '123'},
    )

    assert response.status_code == HTTPStatus.UNAUTHORIZED
    assert response.json() == {'detail': 'Email ou senha incorreto'}


def test_jwt_wrong_email(client, user):
    response = client.post(
        'auth/login',
        data={'username': '123', 'password': user.clean_password},
    )

    assert response.status_code == HTTPStatus.UNAUTHORIZED
    assert response.json() == {'detail': 'Email ou senha incorreto'}


def test_jwt_refresh_token(client, token):
    response = client.post(
        '/auth/refresh_token',
        headers={'Authorization': f'Bearer {token}'},
    )

    data = response.json()

    assert response.status_code == HTTPStatus.OK
    assert 'access_token' in data
    assert 'token_type' in data
    assert data['token_type'] == 'Bearer'


def test_jwt_expired_dont_refresh(client, user):
    with freeze_time('2026-01-22 20:00:00'):
        response = client.post(
            '/auth/login',
            data={'username': user.email, 'password': user.clean_password},
        )
        assert response.status_code == HTTPStatus.OK
        token = response.json()['access_token']

    with freeze_time('2026-01-22 20:31:00'):
        response = client.post(
            '/auth/refresh_token',
            headers={'Authorization': f'Bearer {token}'},
        )
        assert response.status_code == HTTPStatus.UNAUTHORIZED
        assert response.json() == {
            'detail': 'Não foi possivel validar a credêncial'
        }
