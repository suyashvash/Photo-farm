import { response, Router } from 'express'
import FarmPost from '../models/posts.model.js'
import User from '../models/user.model.js'

const postRouter = Router();

const statusObject = {
    success: { code: 200, message: 'Request completed sucessfully' },
    postCreated: { code: 201, message: 'Post created !' },
    serverError: { code: 500, message: 'Server internal error' },
    invalidToken: { code: 404, message: 'No user found | Invalid token!' },
    noPost: { code: 404, message: 'No posts found!' }
}

postRouter.route('/showall').get((req, res) => {
    FarmPost.find()
        .then(response => { res.json(response) })
        .catch(err => res.json(err))
})

postRouter.route('/addPost').post((req, res) => {
    const token = req.body.token;
    const caption = req.body.caption;
    const postUrl = req.body.postUrl;
    let username;
    let userpic;

    User.find()
        .then(userArray => {
            if (userArray.length == 0) {
                res.sendStatus(statusObject.invalidToken.code).json(statusObject.invalidToken.message)
                return
            } else {
                userArray.forEach(user => {
                    if (user.token == token) {
                        username = user.username;
                        userpic = user.userpic;

                        const newPost = FarmPost({ token, username, userpic, caption, postUrl })
                        newPost.save()
                            .then(res.sendStatus(statusObject.postCreated.code).json(statusObject.postCreated.message))
                            .catch(res.sendStatus(statusObject.serverError.code).json(statusObject.serverError.message))

                        return
                    } else {
                        return res.sendStatus(statusObject.invalidToken.code).json(statusObject.invalidToken.message)
                    }
                })
            }
        })
        .catch(res.sendStatus(statusObject.serverError.code).json(statusObject.serverError.message))
})

postRouter.route('/mypost/:id').get((req, res) => {
    const token = req.params.id;
    const postArray = [];

    FarmPost.find()
        .then(farm => {
            if (farm.length == 0) {
                res.sendStatus(statusObject.noPost.code).json(statusObject.noPost.message)
                return
            } else {
                farm.forEach(post => {
                    if (post.token == token) {
                        postArray.push(post);
                    }
                })
                const getData = { code: statusObject.success.code, message: statusObject.success.message, posts: postArray }
                res.json(getData)
                return
            }
        })
        .catch(res.sendStatus(statusObject.serverError.code).json(statusObject.serverError.message))
})


export default postRouter;