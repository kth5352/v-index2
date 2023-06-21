import express from "express"
import mysql from "mysql"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()
const port = 3010

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'vdb'
})

db.connect()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({ result: "success" })
})


app.get('/vtuber-data', (req, res) => {
    const sql = 'SELECT v.name AS name, v.vtuber_link AS link, v.image AS img, c.name AS company, vtuber_id, v.vtuber_detail  FROM vtuber v LEFT JOIN company c ON v.company_id=c.company_id'
    db.query(sql, (err, rows) => {
        if (err) {
            res.json({ result: "error" })
            return console.log(err)
        }
        res.json(rows)
    })
})

app.get('/company-data', (req, res) => {
    const sql = 'SELECT * FROM company'
    db.query(sql, (err, rows) => {
        if (err) {
            res.json({ result: "error" })
            return console.log(err)
        }
        res.json(rows)
    })
})

app.get('/music-data', (req, res) => {
    const sql = 'SELECT m.name, m.music_link, m.image, m.music_id, v.name AS vtuber FROM music m LEFT JOIN vtuber v ON m.vtuber_id = v.vtuber_id'
    db.query(sql, (err, rows) => {
        if (err) {
            res.json({ result: "error" })
            return console.log(err)
        }
        res.json(rows)
    })
})


app.delete('/vtuber-data/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'delete from vtuber where vtuber_id = ?';

    db.query(sql, [id], (err, rows) => {
        if (err) {
            res.json({ result: "error" });
            return console.log(err);
        }
        res.json({ result: "success" });
    });
});


app.delete('/company-data/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'delete from company where company_id = ?';

    db.query(sql, [id], (err, rows) => {
        if (err) {
            res.json({ result: "error" });
            return console.log(err);
        }
        res.json({ result: "success" });
    });
});

app.delete('/music-data/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'delete from music where music_id = ?';

    db.query(sql, [id], (err, rows) => {
        if (err) {
            res.json({ result: "error" });
            return console.log(err);
        }
        res.json({ result: "success" });
    });
});

app.put('/vtuber-data/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, vtuber_detail, vtuber_link, graduation, company_id, image } = req.body;
    const sql = 'UPDATE vtuber SET name = ?, vtuber_detail = ?, vtuber_link = ?, graduation = ?, company_id = ?, image = ? WHERE vtuber_id = ?';

    db.query(sql, [name, vtuber_detail, vtuber_link, graduation, company_id, image, id], (err, rows) => {
        if (err) {
            res.json({ result: "error" });
            return console.log(err);
        }
        res.json({ result: "success" });
    });
});


app.put('/company-data/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, link, image } = req.body;
    const sql = 'UPDATE company SET name = ?, link = ?, image = ? WHERE company_id = ?';

    db.query(sql, [name, link, image, id], (err, rows) => {
        if (err) {
            res.json({ result: "error" });
            return console.log(err);
        }
        res.json({ result: "success" });
    });
});

app.put('/music-data/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, music_link, vtuber_id, image } = req.body;
    const sql = 'UPDATE music SET name = ?, music_link = ?, vtuber_id = ?, image = ? WHERE music_id = ?';

    db.query(sql, [name, music_link, vtuber_id, image, id], (err, rows) => {
        if (err) {
            res.json({ result: "error" });
            return console.log(err);
        }
        res.json({ result: "success" });
    });
});

app.post('/:table', (req, res) => {
    const { table } = req.params;
    const data = req.body;

    const keys = Object.keys(data);
    const values = Object.values(data);

    const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES ?`;

    db.query(sql, [[values]], (err, result) => {
        if (err) {
            res.json({ result: "error" });
            return console.log(err);
        }
        res.json({ result: "success" });
    });
});

app.put('/:table/:id', (req, res) => {
    const { table, id } = req.params;
    const data = req.body;

    const sql = `UPDATE ${table} SET ? WHERE ${table}_id = ?`;

    db.query(sql, [data, id], (err, result) => {
        if (err) {
            res.json({ result: "error" });
            return console.log(err);
        }
        res.json({ result: "success" });
    });
});

app.delete('/:table/:id', (req, res) => {
    const { table, id } = req.params;

    const sql = `DELETE FROM ${table} WHERE ${table}_id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            res.json({ result: "error" });
            return console.log(err);
        }
        res.json({ result: "success" });
    });
});



app.listen(port, () => {
    console.log(`서버 실행됨 (port ${port})`);
});