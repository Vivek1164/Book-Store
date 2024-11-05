import express, { request } from 'express'
import cors from 'cors'
import 'dotenv/config';
import getConnection from './utils/getConnection.js';
import BookRouter from './routes/booksRoutes.js'




const app = express();
app.use(cors())
app.use(express.json())
getConnection();

app.use('/books', BookRouter);
app.get('/', (req,res)=>{
    res.send("Welcome to Book store.")
})





app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening on port: ${process.env.PORT}`)
})