const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const RBTNodeSchema=new Schema({
    value:{tye:Number,required:true},
    color:{type:String,enum:['RED','BLACK'],required:true},
    left: { type: Schema.Types.ObjectId, ref: 'RBTNode' },  // Left child
    right: { type: Schema.Types.ObjectId, ref: 'RBTNode' }, // Right child
    parent: { type: Schema.Types.ObjectId, ref: 'RBTNode' }, // Parent node
  });
  
  const RBTNode = mongoose.model('RBTNode', RBTNodeSchema);
  module.exports = RBTNode;
