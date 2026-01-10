ambiente virtual = poetry shell
lint = 'ruff check'
pre_format = 'ruff check --fix'
format = 'ruff format'
run = 'fastapi dev todolist/app.py'
pre_test = 'task lint'
test = 'pytest -s -x --cov=todolist -vv'
Os comandos definidos fazem o seguinte:

lint: Faz a checagem de boas práticas do código python
pre_format: Faz algumas correções de boas práticas automaticamente
format: Executa a formatação do código em relação às convenções de estilo de código
run: executa o servidor de desenvolvimento do FastAPI
pre_test: executa a camada de lint antes de executar os testes
test: executa os testes com pytest de forma verbosa (-vv) e adiciona nosso código como base de cobertura
post_test: gera um report de cobertura após os testes



Erro de porta aberta por causa do BREAKPOINT(): 
 lsof -i :8000 # ele retorna o numero 79037 ou outro
 kill -9 79037