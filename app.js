const express = require('express');
const mysql = require('mysql');
const path = require('path');
const router =express.Router();

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();


app.use(bodyParser.json());

// MySql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hotel'
});

// Route
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "src", "index.html"));
});

app.get('/historico',(req, res)=>{
  connection.query('SELECT * FROM reservas',(err,rows,fields)=>{
    if (!err){
      res.json(rows);
    } else {
      cosole.log(err);
    }
  })
});

app.get('/historico/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM reservas WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('No hay resultados');
    }
  });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM reservas WHERE id= ${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Registro Eliminado');
  });
});

// Check connect
connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
