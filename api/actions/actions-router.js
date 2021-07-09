// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const { checkActionsID } = require('./actions-middlware')
const router = express.Router();

// - Returns an array of actions (or an empty array) as the body of the response.
router.get('/', (req,res,next) => {
Actions.get(req.params.id)
.then(action => {
    if(action.length === 0){
        res.json([])
    }
    else(
        res.json(action)
    )
})
.catch(next)
})

// - Returns an action with the given `id` as the body of the response.
// - If there is no action with the given `id` it responds with a status code 404.
router.get('/:id', checkActionsID, (req,res, next) => {
    res.json(req.action)
})

// - Returns the newly created action as the body of the response.
// - If the request body is missing any of the required fields it responds with a status code 400.
// - When adding an action make sure the `project_id` provided belongs to an existing `project`.
router.post('/', (req,res,next) => {
    Actions.insert(req.body)
    .then(action => {
        res.json(action)
    })
    .catch(next)
})

// - Returns the updated action as the body of the response.
// - If there is no action with the given `id` it responds with a status code 404.
// - If the request body is missing any of the required fields it responds with a status code 400.
router.put('/:id', checkActionsID, (req,res,next) => {
    Actions.update(req.params.id, req.body)
    .then(updated => {
        res.json(updated)
    })
    .catch(next)
})

// - Returns no response body.
// - If there is no action with the given `id` it responds with a status code 404.
router.delete('/:id', checkActionsID, (req,res,next) => {
    Actions.remove(req.params.id)
    .then()
    .catch(next)
})

module.exports = router