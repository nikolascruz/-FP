# 🕹️ Jogo de Adventure — Fase 1

Bem-vindo ao **Adventure PUCRS: O Surto do NEXUS‑9!**

Este é um joguinho de texto feito para a disciplina de **Programação Orientada a Objetos (POO)**. Ele é simples, divertido e funciona direto no seu terminal. Aqui você vai explorar salas, pegar itens, abrir malas trancadas, desmontar robôs e montar um dispositivo especial!

Este README explica:

* Como **rodar o jogo**
* Como **jogar** (comandos explicadinhos)
* Um mini **tutorial passo a passo** de criança (para não se perder 😄)

---

# 📦 1. Como instalar e rodar o jogo

## ✔ Pré‑requisitos

Você só precisa do **Node.js** instalado no seu computador.

Para verificar:

```
node -v
```

Se aparecer um número (ex: v18.0.0), tudo certo!

---

## ✔ Como rodar

Dentro da pasta do projeto, abra o terminal e digite:

```
node index.js
```

Pronto! O jogo começa na mesma hora.

---

# 🧭 2. Como jogar (comandos simples!)

O jogo funciona com **comandos de texto**. Você escreve um comando, aperta ENTER e vê o que acontece.

Aqui estão todos os comandos:

### 👀 Ver a sala

```
olhar
```

Mostra onde você está, o que tem na sala e para onde pode ir.

### 🔍 Examinar algo

```
examinar <id>
```

Exemplo:

```
examinar bilhete-senha
```

### 👣 Ir para outra sala

```
ir <direcao>
```

Direções possíveis: **norte, sul, leste, oeste**.

Exemplo:

```
ir sul
```

### ✋ Pegar itens

```
pegar <id>
```

### 🧺 Largar itens

```
largar <id>
```

### 🔓 Abrir malas na senha

```
abrir <containerId> <codigo>
```

Exemplo:

```
abrir mala-pecas 0420
```

### 🤖 Retirar peça de robô

```
retirar robo-aux
```

### 🔧 Usar um item em outro item

```
usar <itemId> <alvoId>
```

Exemplo:

```
usar doc-prof terminal-controle
```

### ⚙️ Montar o dispositivo especial

```
montar
```

(Precisa estar na Sala de Controle e ter as peças certas.)

### 🎒 Ver o inventário

```
inventario
```

### ❓ Ver ajuda

```
ajuda
```

### 🚪 Sair do jogo

```
sair
```

---

# 🚸 3. Tutorial super simples (modo criança 😄)

Aqui vai um passo a passo bem fácil para vencer a Fase 1.

🌟 **Objetivo:** montar o **Desativador Neural**.

---

## 🏁 **1. Começo: Laboratório de Protótipos**

Digite:

```
olhar
```

Pegue o bilhete:

```
pegar bilhete-senha
```

Opcional: pegue a ferramenta:

```
pegar ferramenta
```

Saia para o sul:

```
ir sul
```

---

## 🧰 **2. Almoxarifado Técnico**

Pegue o documento importante:

```
pegar doc-prof
```

Abra a mala usando a senha do bilhete:

```
abrir mala-pecas 0420
```

Pegue a peça mecânica:

```
pegar peca-mecanica
```

Depois, vá para o sul:

```
ir sul
```

---

## 🤖 **3. Laboratório de Eletrônica**

Retire o módulo lógico do robô:

```
retirar robo-aux
```

Pegue o módulo:

```
pegar modulo-logico
```

Siga para o sul:

```
ir sul
```

---

## 💻 **4. Sala de Controle**

Use o documento para desbloquear o terminal:

```
usar doc-prof terminal-controle
```

Agora monte o dispositivo:

```
montar
```

Veja seu inventário:

```
inventario
```

Pronto! Na Fase 2 você poderá usar o Desativador Neural para concluir o final do jogo!

---

# 🎉 4. Parabéns!

Você terminou a Fase 1 do Adventure PUCRS!
Agora seu jogo já está pronto para envio conforme as regras da disciplina.

Se quiser evoluir a Fase 2 depois, basta adicionar:

* mais salas
* mais itens
* finais diferentes
* lógica da porta de saída
* interações com o Mega Cérebro

Boa entrega e bom semestre! 🚀🧠💡
