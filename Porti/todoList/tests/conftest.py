import pytest
from fastapi.testclient import TestClient

from todolist.app import app


@pytest.fixture
def client():
    return TestClient(app)
