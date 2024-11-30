const express=require('express')
const cors=require('cors')
const app=express();
const Port=5000
const db=require('./db');
const user=require('./model/user')
const tree=require('./model/treeNode')
app.use(cors());
app.use(express.json());

const treeRoutes=require('./routes/treeRoutes');
app.use('/api/tree',treeRoutes);  //middleware that routes to treeRoutes

const AVLRoutes=require('./routes/AVLRoutes');
app.use('/api/avltree',AVLRoutes);
db.connectToDb();

app.listen(Port,()=>console.log(`Backend running on localhost http:${Port}`))
