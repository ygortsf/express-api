const express = require('express');
const app = express();

const citacoes = [
  { autor: "Albert Einstein", citacao: "A imaginação é mais importante que o conhecimento." },
  { autor: "Ada Lovelace", citacao: "A máquina analítica não tem pretensão alguma de originar nada. Ela pode fazer qualquer coisa que saibamos ordená-la a fazer." },
  { autor: "Marie Curie", citacao: "Nada na vida deve ser temido, somente compreendido." },
  { autor: "Galileu Galilei", citacao: "A matemática é o alfabeto com o qual Deus escreveu o universo." },
  { autor: "Charles Darwin", citacao: "Não é o mais forte que sobrevive, nem o mais inteligente, mas o que melhor se adapta às mudanças." },
  { autor: "Nikola Tesla", citacao: "O presente é deles; o futuro, pelo qual eu realmente trabalhei, é meu." },
  { autor: "Stephen Hawking", citacao: "A inteligência é a capacidade de se adaptar à mudança." },
  { autor: "Richard Feynman", citacao: "O que eu não posso criar, eu não entendo." },
  { autor: "Niels Bohr", citacao: "Um especialista é uma pessoa que cometeu todos os erros possíveis numa área muito restrita." },
  { autor: "Neil deGrasse Tyson", citacao: "O bom da ciência é que ela é verdadeira, quer você acredite nela ou não." }
  { autor: "Louis Pasteur", citacao: "A sorte favorece a mente preparada." },
  { autor: "Johannes Kepler", citacao: "A natureza usa o mínimo possível de tudo." },
  { autor: "Thomas Edison", citacao: "Genialidade é 1% inspiração e 99% transpiração." },
  { autor: "Max Planck", citacao: "A ciência não pode resolver o mistério final da natureza." },
  { autor: "Erwin Schrödinger", citacao: "A tarefa não é tanto ver aquilo que ninguém viu, mas pensar o que ninguém ainda pensou sobre aquilo que todos veem." },
  { autor: "Michael Faraday", citacao: "Nada é maravilhoso demais para ser verdadeiro se estiver de acordo com as leis da natureza." },
  { autor: "Carl Sagan", citacao: "Alegações extraordinárias exigem evidências extraordinárias." },
  { autor: "Alan Turing", citacao: "Só podemos ver um pouco do futuro, mas o suficiente para perceber que há muito a fazer." },
  { autor: "Jane Goodall", citacao: "O que você faz faz a diferença, e você tem que decidir que tipo de diferença quer fazer." },
  { autor: "Edwin Hubble", citacao: "Equipado com seus cinco sentidos, o homem explora o universo ao seu redor e chama a aventura de Ciência." },
  { autor: "Werner Heisenberg", citacao: "O que observamos não é a natureza em si, mas a natureza exposta ao nosso método de questionamento." },
  { autor: "Richard Dawkins", citacao: "A ciência é a poesia da realidade." },
  { autor: "Grace Hopper", citacao: "A frase mais perigosa na nossa língua é: 'Sempre fizemos assim'." },
  { autor: "Enrico Fermi", citacao: "Existem dois resultados possíveis: se o resultado confirma a hipótese, então você fez uma medida. Se o resultado é contrário à hipótese, então você fez uma descoberta." },
  { autor: "Alexander Fleming", citacao: "Às vezes a gente encontra o que não está procurando." },
  { autor: "James Clerk Maxwell", citacao: "O trabalho puramente mental precisa de um período de descanso." },
  { autor: "Rosalind Franklin", citacao: "A ciência e a vida cotidiana não podem e não devem ser separadas." },
  { autor: "Isaac Newton", citacao: "Se vi mais longe, foi por estar de pé sobre ombros de gigantes." },
  { autor: "Dmitri Mendeleev", citacao: "Não há nada neste mundo de que possamos ter tanta certeza como a morte e os impostos." },
  { autor: "Antoine Lavoisier", citacao: "Na natureza nada se cria, nada se perde, tudo se transforma." },
];

// Rota inicial 
app.get('/', (req, res) => {
  res.send('API Express rodando no Vercel!');
});

//Número aleatório entre 1 e 100
app.get('/random', (req, res) => {
  const numero = Math.floor(Math.random() * 100) + 1;
  res.send(numero.toString()); // Convertido para string para evitar que o Express interprete como status HTTP
});

 // Número aleatório entre 1 e 6
app.get('/dado', (req, res) => {
  const dado = Math.floor(Math.random() * 6) + 1;
  res.send(dado.toString());
});

app.get('/citacoes', (req, res) => {
  const indiceAleatorio = Math.floor(Math.random() * citacoes.length);
  // res.send enviando um objeto JSON conforme solicitado
  res.send(citacoes[indiceAleatorio]);
});

// Exporta o app para o Vercel utilizar como serverless function
