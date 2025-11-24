# 🧠 Adventure POO – NEXUS-9: O Enigma da Poli

Bem-vindo ao **Adventure POO**, um jogo estilo *text adventure* desenvolvido em **JavaScript**, utilizando **Programação Orientada a Objetos (POO)**.

Este projeto foi criado para a disciplina de **Fundamentos Web – PUCRS**, contemplando **Fase 1** e **Fase 2** da entrega.

---

# 📘 1. História do Jogo

Você é um estudante preso no **Laboratório da Politécnica da PUCRS** após um surto inesperado de robôs autônomos.  
O supercomputador **NEXUS-9** assumiu o controle das instalações, bloqueando todas as saídas.

Seu objetivo:

### **Construir um dispositivo especial chamado _Desativador Neural_ e usá-lo no Mega Cérebro NEXUS-9 para reaver o controle da Poli e escapar.**

Para isso, você deverá:

- Explorar laboratórios da faculdade  
- Coletar peças mecânicas e módulos eletrônicos  
- Decifrar bilhetes e documentos  
- Desbloquear o terminal central  
- Montar o dispositivo  
- Finalmente usá-lo no NEXUS-9 e fugir pela porta de saída  

Boa sorte!

---

# 🧩 2. Estrutura do Jogo

O jogo utiliza 4 salas principais:

1. **Laboratório de Protótipos**  
2. **Almoxarifado Técnico**  
3. **Laboratório de Eletrônica**  
4. **Sala de Controle**  

Cada sala contém **objetos**, **ferramentas**, **documentos**, e em alguns casos, **máquinas interativas**.

Todo o jogo funciona com **comandos de texto digitados pelo jogador**.

---

# 🕹️ 3. Como Rodar o Jogo

### Pré-requisitos
- Node.js instalado

### Executar no terminal

```bash
node index.js
````

Isso iniciará a aventura.

---

# 📚 4. Comandos do Jogo

Você controla seu personagem digitando comandos como estes:

### 🟦 Comandos gerais

```
ajuda
inventario
olhar
examinar <item>
```

### 🟪 Movimentação

```
ir <direcao>
mover sul
```

Direções válidas: **norte, sul, leste, oeste**

### 🟩 Manipulando objetos

```
pegar <itemId>
largar <itemId>
abrir <container> <senha>
retirar <robo>
usar <item> <alvo>
```

### 🟧 Montagem (Fase 2)

```
montar
```

### 🟥 Finalizar o jogo

```
usar porta-saida
```

---

# 🧠 5. Objetivo Final

Para vencer o jogo, você precisa:

1. Coletar as duas peças essenciais:

   * `peca-mecanica`
   * `modulo-logico`

2. Desbloquear o **Terminal de Controle** usando o documento encontrado no Almoxarifado.

3. Montar o **Desativador-neural**.

4. Usá-lo no **Mega Cérebro NEXUS-9**:

```
usar desativador-neural mega-cerebro
```

5. Então escapar:

```
usar porta-saida
```

---

# 📝 6. Roteiro rápido para terminar o jogo

Se quiser testar rapidamente:

```
olhar
ir sul
abrir mala-pecas 0420
pegar peca-mecanica
pegar doc-prof
ir sul
retirar robo-aux
pegar modulo-logico
ir sul
usar doc-prof terminal-controle
montar
usar desativador-neural mega-cerebro
usar porta-saida
```

---

# 🛠️ 7. Estrutura do Código (Arquitetura)

O jogo usa Programação Orientada a Objetos com as seguintes classes:

* `Item`
* `ItemColetavel`
* `Documento`
* `Container`
* `Terminal`
* `RoboAuxiliar`
* `Dispositivo`
* `MegaCerebro`
* `Sala`
* `Jogador`
* `Jogo`

Cada classe foi projetada para cumprir um papel claro dentro da aventura.

---

# 🎉 8. Créditos

Projeto desenvolvido para a disciplina de **Fundamentos Web – PUCRS**, utilizando JavaScript e conceitos de Programação Orientada a Objetos.

---

# 🚀 9. Boa Sorte!

Explore as salas, leia as pistas, combine itens e resolva o enigma para escapar da Poli.
Divirta-se — e cuidado com o NEXUS-9!
