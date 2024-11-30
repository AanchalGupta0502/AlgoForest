const express=require('express')
const router=express.Router;
const { insertRBTNode, balanceRBT, deleteRBTNode, findUncle } = require('../utils/rbtOperations');
const RBTNode = require('../model/RBTree');

const buildTree = async (nodeId) => {
    if (!nodeId) return null;
  
    const node = await RBTNode.findById(nodeId);
    if (!node) return null;
  
    // Recursively build left and right subtrees
    const leftChild = await buildTree(node.left);
    const rightChild = await buildTree(node.right);
  
    return {
      id: node._id.toString(),
      value: node.value,
      color: node.color,  // Red or Black
      left: leftChild,
      right: rightChild || null,  // Explicitly set right child to null if it doesn't exist
    };
  };

router.get('/',async(req,res)=>{
try{
    const RootNode=await RBTNode.findOne();
    if(!RootNode){
        return res.status(404).json({message:'Tree is empty'});
    }

    const tree=await buildTree(RootNode._id);
    res.json(tree);
}catch(err){
    console.log("Error getting tree",err);
    res.status(500).json({error:err.message});
}
});

router.post('/add',async(req,res)=>{
    const{value}=req.body;
    try{
    let root=await RBTNode.findOne();

    if(!root){
        const newnode=new RBTNode({value,color:'BLACK'});
        await newnode.save();
        return res.json(newnode);
    }
    root=await insertRBTNode(root,value);
    root=await balanceRBT(root);
    await root.save();
    res.json(root);
}catch(err){
    console.error("Error adding node to RBT  tree:",err);
    res.status(500).json({error:err.message});
}
});

router.delete('/:id',async(req,res)=>{
    try{
        const nodeId=req.params.id;
        const nodeToDelete=await RBTNode.findByIdAndDelete(nodeId);

        if(!nodeToDelete){
            return res.status(404).json({error:'Node not found'});
        }

        const rootNode=await RBTNode.findOne();
        const balancedRoot=await balanceRBT(rootNode);
        await balancedRoot.save();
        res.json({message:'Node deleted and tree rebalanced'});
    }catch(err){
        console.error("Error deleting node",err);
        res.status(500).json({error:err.message});
    }
});
module.exports=router;