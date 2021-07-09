// add middlewares here related to actions
const Actions = require('./actions-model');
const checkActionsID =  async(req,res,next) => {
    try{
        const { id } = req.params
        const action = await Actions.get(id)
        if(action){
            req.action = action
            next()
        }
        else{
            next({
                status: 404,
                message: `action with ${id} does not exist`
            })
        }
    }
    catch(error){
        next(error)
    }
}

module.exports = { checkActionsID }