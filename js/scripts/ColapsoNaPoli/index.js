// index.js
import readline from 'readline';
import { Jogo } from './jogo.js';

const jogo = new Jogo();
console.log(jogo.iniciar());

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.setPrompt('> ');
rl.prompt();

rl.on('line', async (line) => {
  const res = await jogo.processar(line);
  console.log(res);
  if (!jogo.rodando) rl.close(); else rl.prompt();
});
