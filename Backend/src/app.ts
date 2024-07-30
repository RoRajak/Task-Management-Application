import cors from 'cors';
import express from "express"
import userRoute from './routes/user.route'
import todoRoute from './routes/todo.route'
import sessionRoute from './routes/auth'


const app=express();

app.use(cors())
app.use(express.json())

app.use('/user',userRoute)
app.use('/todo',todoRoute)
app.use("/api",sessionRoute)


export {app}