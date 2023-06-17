import express, { Request, Response } from "express"
import mysql from "mysql"

const app = express()
const dbc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'vdb'
})

dbc.connect();

app.listen('3000', () => {
    console.log('Server Started')
})

app.get('/', (req: Request, res: Response) => {
    res.send('Success!');
});