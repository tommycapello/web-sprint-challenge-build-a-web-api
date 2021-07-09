// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const { checkProjectID } = require('./projects-middleware')
const router = express.Router();


// - Returns an array of projects as the body of the response.
// - If there are no projects it responds with an empty array.
router.get('/', (req,res,next) => {
    Projects.get(req.params.id)
    .then(projects => {
        if(projects.length === 0){
            res.json([])
        }
        else(
            res.json(projects)
        )
    })
    .catch(next)})

// - Returns a project with the given `id` as the body of the response.
// - If there is no project with the given `id` it responds with a status code 404.
router.get('/:id', checkProjectID, (req,res,next) =>{
    res.json(req.project)
})

// - Returns the newly created project as the body of the response.
// - If the request body is missing any of the required fields it responds with a status code 400.
router.post('/', (req,res, next) =>{
    const { name, description } = req.body
    if(!name || !description){
        res.status(400).json({
            message: 'Please complete all the required fields'
        })
    }
    else{
        Projects.insert(req.body)
        .then(project => {
            res.json(project)})
        .catch(next)
        }
    })

    // - Returns the updated project as the body of the response.
    // - If there is no project with the given `id` it responds with a status code 404.
    // - If the request body is missing any of the required fields it responds with a status code 400.
router.put('/:id', checkProjectID, (req,res,next) => {
        Projects.update(req.params.id, req.body)
        .then(project => {
                res.json(project)
            })
        .catch(next)})


// - Returns no response body.
// - If there is no project with the given `id` it responds with a status code 404.
router.delete('/:id', checkProjectID, (req,res,next)=>{
    Projects.remove(req.params.id)
    .then((project) => {
        console.log(`${project} was deleted`)
    })
    .catch(next)
})

// - Returns an array of actions (could be empty) belonging to a project with the given `id`.
// - If there is no project with the given `id` it responds with a status code 404.
router.get('/:id/actions', checkProjectID, (req,res,next)=>{
    Projects.getProjectActions(req.params.id)
    .then(actions => res.json(actions))
    .catch(next)
})

module.exports = router