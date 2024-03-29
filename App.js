const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const mongoose = require("mongoose")

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://tiyajo2002:Pass123456789@cluster0.oft3egy.mongodb.net/cev')
    .then(() => {
        console.log("DB connected")
    })
    .catch(err => {
        console.log('Error :' + err)
    })


const Studentdata = require('./model/Student')


//post method
app.post('/student',async (req,res)=>{


    try {
        let item = req.body
        console.log(item)
    
        const user = new Studentdata(item)
        const savedStudent = await user.save()
        res.status(201).send(savedStudent)
    } catch (error) {
        console.log(error)
    }

   
})

// get data 
app.get('/student', async(req,res)=>{

    try {

        const list = await Studentdata.find()
        res.json(list)

        
    } catch (error) {
        console.log(error)
        res.status(400)
    }
})

//update

app.put('/student/:id',async (req,res)=>{

    try {


        let id = req.params.id
        let item = req.body
        let updatedData = {$set:item}

        let updatedStudent = await Studentdata.findByIdAndUpdate({'_id':id}, updatedData,{new:true})
        res.send(updatedStudent)


        
    } catch (error) {

        console.log(error)
        res.status(400)
        
    }
})


//delete


app.delete('/student/:id',async (req,res)=>{
try {

    let id = req.params.id
    const deleteStudent = await Studentdata.findByIdAndDelete(id)

    res.send(deleteStudent)
    
} catch (error) {
    
}

})







app.listen(3200, () => {
    console.log("Server is running")
})