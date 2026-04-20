require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');

app.use(cors());
app.use(express.json());

// Rota inicial 
app.get('/', (req, res) => {
  res.send('API Express rodando no Vercel!');
});

// Conexão com banco (Neon Db)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

 
// LISTAR
app.get('/tarefas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tarefas ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// CRIAR (POST)
app.post('/tarefas', async (req, res) => {
  try {
    const descricao = req.body.descricao || req.body.texto || req.body.tarefa;
    const concluida = req.body.concluida ?? false;

    if (!descricao) {
      return res.status(400).json({ error: "Descrição é obrigatória" });
    }

    const result = await pool.query(
      'INSERT INTO tarefas (descricao, concluida) VALUES ($1, $2) RETURNING *',
      [descricao, concluida]
    );

    // 🔥 corrigido aqui
    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// BUSCAR POR ID
app.get('/tarefas/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM tarefas WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// ATUALIZAR (PUT)
app.put('/tarefas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const descricao = req.body.descricao || req.body.texto || req.body.tarefa;
    const concluida = req.body.concluida;

    const result = await pool.query(
      'UPDATE tarefas SET descricao = $1, concluida = $2 WHERE id = $3 RETURNING *',
      [descricao, concluida, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// DELETAR
app.delete('/tarefas/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM tarefas WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    res.json({ message: "Tarefa removida com sucesso" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


//exporta para vercel
module.exports = app;



