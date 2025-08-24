require('dotenv').config();
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors');

const authRouter = require('./routes/authRoutes');
const jobRouter = require('./routes/jobRoutes');
const adminRouter = require('./routes/adminRoutes');


const app = express()
const PORT = process.env.PORT || 3000

connectDB();

app.use(express.json());
app.use(cors());

app.get('/api', (req,res)=>{
    res.send('Api working')
})

app.use('/api/auth',authRouter)
app.use('/api/job',jobRouter)
app.use('/api/admin',adminRouter)

app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`)
})