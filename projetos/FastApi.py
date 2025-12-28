from typing import Union
from fastapi import FastAPI

app = FastAPI()

veiculos = {
    1: {"tipo": "carro", "cor": "branco", "motor": "2.0", "preco": 15000.00},
    2: {"tipo": "moto", "cor": "preto", "motor": "600cc", "preco": 35000.00},
    3: {"tipo": "caminhao", "cor": "vermelho", "motor": "diesel 4.5", "preco": 120000.00},
    4: {"tipo": "carro", "cor": "prata", "motor": "1.0", "preco": 45000.00},
    5: {"tipo": "moto", "cor": "azul", "motor": "125cc", "preco": 8000.00},
    6: {"tipo": "carro", "cor": "preto", "motor": "1.6", "preco": 60000.00},
    7: {"tipo": "caminhao", "cor": "branco", "motor": "diesel 6.0", "preco": 180000.00},
    8: {"tipo": "carro", "cor": "amarelo", "motor": "2.0 turbo", "preco": 150000.00},
    9: {"tipo": "moto", "cor": "verde", "motor": "1000cc", "preco": 70000.00},
    10: {"tipo": "carro", "cor": "vermelho", "motor": "1.4", "preco": 55000.00},
    11: {"tipo": "van", "cor": "branca", "motor": "2.3", "preco": 95000.00},
    12: {"tipo": "carro", "cor": "cinza", "motor": "1.8", "preco": 75000.00},
    13: {"tipo": "moto", "cor": "laranja", "motor": "300cc", "preco": 22000.00},
    14: {"tipo": "carro", "cor": "azul", "motor": "2.0", "preco": 90000.00},
    15: {"tipo": "caminhao", "cor": "prata", "motor": "diesel 8.0", "preco": 250000.00},
    16: {"tipo": "carro", "cor": "verde", "motor": "1.0", "preco": 38000.00},
    17: {"tipo": "moto", "cor": "branca", "motor": "750cc", "preco": 45000.00},
    18: {"tipo": "carro", "cor": "marrom", "motor": "1.6", "preco": 62000.00},
    19: {"tipo": "carro", "cor": "preto fosco", "motor": "V6", "preco": 210000.00},
    20: {"tipo": "van", "cor": "prata", "motor": "2.3", "preco": 110000.00}
}

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/veiculos/{veiculo_id}")
def veiculo(veiculo_id:int):
    if veiculo_id and veiculo_id in veiculos:
        return veiculos[veiculo_id]
    return {"erro": "Veículo não encontrado ou ID inválido"}