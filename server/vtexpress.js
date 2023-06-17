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

app.get('/vtuber', (req, res) => {
    const sql = 'select * from VTUBER'

    db.query(sql, (err, rows) => {
        if (err) {
            res.json({ result: "error" })
            return console.log(err)
        }
        res.json(rows)
    })
})

app.get('/mysql-data', (req, res) => {
    const sql = 'SELECT v.name AS name, v.vtuber_link AS link, v.image AS img, c.name AS company, vtuber_id, v.vtuber_detail  FROM vtuber v LEFT JOIN company c ON v.company_id=c.company_id'
    db.query(sql, (err, rows) => {
        if (err) {
            res.json({ result: "error" })
            return console.log(err)
        }
        res.json(rows)
    })
})


app.listen(port, () => {
    console.log(`서버 실행됨 (port ${port})`)
})