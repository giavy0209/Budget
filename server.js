const express= require('express');
const app = express();
const port = 3008;
const fs = require('fs');
const server = require("http").Server(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
server.listen(port);
app.use(express.static("build"));
const io = require("socket.io")(server);
const mongoose = require('mongoose');

mongoose.connect('mongodb://207.148.67.200:27017/baitaptuan2',{ useNewUrlParser: true ,useUnifiedTopology: true});
const budgetSchema = new mongoose.Schema({
    name:String,
    value:Number,
    isIncome: Boolean,
});

const budgetInfos = mongoose.model('budgetInfos', budgetSchema);


io.on('connection',async function(socket){
    var budget = await budgetInfos.find({})
    socket.emit('res-budget', budget)
    socket.on('add-budget',data=>{
        var o = {name,value,isIncome} = data;
        budgetInfos.create(o,(err,bud)=>socket.emit('add-success',bud))
    })
    socket.on('delete-bud',id=>{
        budgetInfos.findByIdAndDelete(id,()=>socket.emit('delete-bud-success'))
    })
})


app.get('/',(req,res)=>{
    res.sendFile('./build/index.html')
})