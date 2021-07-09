// add middlewares here related to projects
const Projects = require('../projects/projects-model');


const checkProjectID =  async(req,res,next) => {
    try{
        const { id } = req.params
        const project = await Projects.get(id)
        if(project){
            req.project = project
            next()
        }
        else{
            next({
                status: 404,
                message: `project with ${id} does not exist`
            })
        }
    }
    catch(error){
        next(error)
    }
}

const pageNotFound = (req, res, next) => {
    res.status(404).json({
        message: 'Project not found'
    })
}

const errorHandler = (err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({
        message: err.message
    })
}

module.exports = {
    checkProjectID,
    pageNotFound,
    errorHandler
}