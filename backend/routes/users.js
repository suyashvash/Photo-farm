import { Router } from 'express'
import User from '../models/user.model.js'

const userRouter = Router();

const statusObject = {
    success: { code: 200, message: 'Request completed sucessfully' },
    userCreated: { code: 201, message: 'User registered !' },
    newUserExist: { code: 409, message: 'Username already exists!' },
    noUser: { code: 404, message: 'No user Found' },
    loginSucess: { code: 200, message: 'Login Sucessfull !' },
    serverError: { code: 500, message: 'Server internal error' },
    invalidToken: { code: 404, message: 'Invalid token!' }
}


userRouter.route('/register').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const timeStamp = new Date().getTime();
    const token = `${timeStamp}${req.body.username}`;

    const newUser = new User({ username, token, password })

    User.find()
        .then(userArray => {
            if (userArray.length == 0) {
                console.log("No user is user list!")
                newUser.save()
                    .then(() => { return res.sendStatus(statusObject.success.code).json(statusObject.success.message) })
                    .catch(() => { return res.sendStatus(statusObject.serverError.code).json(statusObject.serverError.message) })
            } else {
                userArray.forEach(user => {
                    if (user.username == username) {
                        res.sendStatus(statusObject.newUserExist.code).json(statusObject.newUserExist.message)
                        return
                    } else {
                        newUser.save()
                            .then(res.sendStatus(statusObject.userCreated.code).json(statusObject.userCreated.message))
                            .catch(res.sendStatus(statusObject.serverError.code).json(statusObject.serverError.message))
                        return
                    }
                })
            }
        })
        .catch(res.sendStatus(statusObject.serverError.code).json(statusObject.serverError.message));


})


userRouter.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.find()
        .then(userArray => {
            if (userArray.length == 0) {
                res.sendStatus(statusObject.noUser.code).json(statusObject.noUser.message)
            } else {
                userArray.forEach(user => {
                    if (user.username == username && user.password == password) {
                        const loginData = { message: statusObject.loginSucess.message, token: user.token }
                        res.sendStatus(statusObject.loginSucess.code).json(loginData)
                        return
                    } else {
                        res.sendStatus(statusObject.noUser.code).json(statusObject.noUser.message)
                        return
                    }
                })
            }
        })
        .catch(res.sendStatus(statusObject.serverError.code).json(statusObject.serverError.message));
})



userRouter.route('/userDetail/:id').get((req, res) => {
    User.find()
        .then(userArray => {
            if (userArray.length == 0) {
                res.sendStatus(statusObject.noUser.code).json(statusObject.noUser.message)
                return
            }
            else {
                userArray.forEach(user => {
                    if (user.token == req.params.id) {
                        const userGetData = { message: statusObject.success.message, userData: user }
                        res.sendStatus(statusObject.success.code).json(userGetData)
                        return
                    } else {
                        res.sendStatus(statusObject.invalidToken.code).json(statusObject.invalidToken.message)
                        return
                    }
                })
            }
        })
})





export default userRouter;