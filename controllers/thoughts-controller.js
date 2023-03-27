
const CreateThoughts = require('../models/thoughts-mvc');

const showThoughts = async(req,res,next) =>{
    const thoughts = await CreateThoughts.pullThoughts();

    res.json({data: thoughts})
}


const createThoughts = async (req,res,next)=>{
    const target = req.body;
    let createThought;
    let data;
    try {
        createThought = new CreateThoughts(target.header,target.content,target.date);
        const result = await createThought.saveThought();
        data = result.insertedId
    }catch(err) {
        return next(err)
    }
    
    createThought.id = data.toString();

    res.json({message: "Now we build it",info:createThought})
}

const getThoughtData = async (req,res,next)=>{
    let data;
    
    try {
        data = new CreateThoughts(null,
            null,null,req.params.id);
        await data.getThought();
    }catch(err) {
        return next(err)
    }

    res.json({message: "Now we build it",data:data})
}

const updateThoughts = async (req,res,next)=>{
    const target = req.body;
    let updateThought;
    try {
        updateThought = new CreateThoughts(target.header,
            target.content,target.date,req.params.id);
        
        await updateThought.saveThought();
    }catch(err) {
        return next(err)
    }

    res.json({message: "Now we build it",updateThought:updateThought})
}

const deleteThoughts = async (req,res,next)=>{

    let deleteThought;
    
    try {
        deleteThought = new CreateThoughts(null,
            null,null,req.params.id);
        
        await deleteThought.deleteThought();
    }catch(err) {
        return next(err)
    }

    res.json({message: "Deleted Successfully"})
}

module.exports = {
    showThoughts:showThoughts,
    createThoughts:createThoughts,
    getThoughtData:getThoughtData,
    updateThoughts:updateThoughts,
    deleteThoughts:deleteThoughts
}