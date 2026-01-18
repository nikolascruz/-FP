from fastapi import FastAPI
from fastapi.responses import HTMLResponse

from routers import auth, users

app = FastAPI(
    title='Minha API de To do List',
    swagger_ui_parameters={
        'syntaxHighlight': {'theme': 'tomorrow-night'}  # Altera o tema
    },
)

app.include_router(users.router)
app.include_router(auth.router)


@app.get('/', response_class=HTMLResponse)
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
