const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const AVLNodeSchema=new Schema({
value:{type:Number,required:true},
left:{type:Schema.Types.ObjectId,ref:'AVLNode'},
right:{type:Schema.Types.ObjectId,ref:'AVLNode'},
height:{type:Number,default:1},
parent:{type:Schema.Types.ObjectId,ref:'AVLNode'}
});
const AVLNode=mongoose.model('AVLNode',AVLNodeSchema);
module.exports=AVLNode;