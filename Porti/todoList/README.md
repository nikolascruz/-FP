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

docker run -d \
    --name app_database \
    -e POSTGRES_USER=app_user \
    -e POSTGRES_DB=app_db \
    -e POSTGRES_PASSWORD=app_password \
    -p 5432:5432 \
    postgres


Error response from daemon: failed to create task for container: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: exec: "./entrypoint.sh": permission denied: unknown

chmod +
x entrypoint.sh

docker-compose up