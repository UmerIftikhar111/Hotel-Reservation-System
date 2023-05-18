const express =  require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors');
const InventoryRouter = require('./Routes/InventoryRoutes')
const LostItemRouter = require('./Routes/LostItemRoutes')
const InspectionRouter = require('./Routes/RoomInspectionRoutes')
const CleaningRouter = require('./Routes/RoomCleaningRoutes')


mongoose.connect(process.env.mongo_url).then( ()=>{
    console.log("DB connected")
} ).catch( err=>{
    console.log(err)
}) 

const app = express()
app.use(express.json())
app.use(cors());
app.get('/', (req,res) => {
    res.send('hi there!!')
})

app.use('/inventory',InventoryRouter);
app.use('/lostAndfound',LostItemRouter);
app.use('/inspection',InspectionRouter);
app.use('/cleaning',CleaningRouter);

app.listen( process.env.port || 3000 ,()=>{
    console.log(`Server up at http://${process.env.url}:${process.env.port}`)
});

