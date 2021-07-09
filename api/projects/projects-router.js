// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();

router.get('/', async(req,res) => {
    try{
        const projects = await Projects.get()
        if(projects.length === 0){
            res.status(200).json([])
        }
        else(
            res.status(200).json(projects)
        )
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
})

router.get('/:id', async (req,res) =>{
    if(!req.params.id){
        res.status(404).json({
            message: 'There is no project with the given ID'
        })
    }
    else{
        const project = await Projects.get(req.params.id);
        res.json(project)
    }
})

router.post('/', (req,res) =>{
    const body = req.body
    if(!body){
        res.status(400).json({
            message: 'Please complete all the required fields'
        })
    }
    else{Projects.insert(req.body)
        .then(project => res.json(project))
        .catch(err => {
        res.status(500).json({
        message: err.message})
        })
        }
    })


    

module.exports = router