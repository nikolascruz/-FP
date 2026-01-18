from http import HTTPStatus


# client eestá sendo importado de conftest pelo pytest.fixture
def test_rota_hello(client):
    response = client.get('/')

    assert response.status_code == HTTPStatus.OK
    assert '<h1> Hello World </h1>' in response.text
