import axios from 'axios';

const API= axios.create({baseURL:'http://localhost:5000/api/tree'});
export const getTree=()=>API.get('/');
export const addNode=(value)=>API.post('/add',{value});
export const deleteNode=(id)=>API.delete(`/${id}`);


//AVL APIS
const AvlAPI=axios.create({baseURL:'http://localhost:5000/api/avltree'})
export const getAVLTree=()=> AvlAPI.get('/');
export const addAVLNode=(value)=>AvlAPI.post('/add',{value});
export const deleteAVLNode=(id)=>AvlAPI.delete(`/${id}`);