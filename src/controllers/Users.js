const ODM = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const Users = {
    index: (request, response) => {
        User
            .find()
            .exec()
            .then(foundUsers => {
                response
                    .status(200)
                    .json({
                        type: 'Getting Users',
                        meta: foundUsers.length,
                        data: foundUsers
                    });
            })
            .catch(error => console.log(error));
    },
    signup: (request, response) => {
        User
            .find({email: request.body.email})
            .exec()
            .then(foundUser => {
                if(foundUser.length < 1) {
                    //Save new user using bcrypt (hashing password)
                    bcrypt.hash(request.body.password, 10, (error, hash) => {
                        if(error) {
                            return response
                                    .status(500)
                                    .json({
                                        message: error
                                    })
                        }
                        //Create new user
                        const newUser = new User ({
                            _id: ODM.Types.ObjectId(),
                            name: request.body.name,
                            phone: request.body.phone,
                            email: request.body.email,
                            password: hash
                        });

                        newUser
                            .save()
                            .then(savedUser => {
                                response
                                    .status(200)
                                    .json({
                                        message: 'User created successfully',
                                        data: savedUser
                                    });
                            })
                    });
                } else {
                    response
                        .status(422)
                        .json({
                            message: 'User already exists'
                        })
                }
            })
    },
    login: (request, response) => {
        User
            .find({email: request.body.email})
            .exec()
            .then(foundUser => {
                if(foundUser.length > 0) {
                    //Comparacion de passwords
                    bcrypt.compare(request.body.password, foundUser[0].password, (error, result) => {
                        if(error) {
                            return response
                                    .status(401)
                                    .json({
                                        message: 'Authentication Failed'
                                    })
                        }
                        //Se crea token
                        if(result) {
                            const token = jwt.sign({
                                name: foundUser[0].name,
                                email: foundUser[0].email
                            }, process.env.JWT_SECRETKEY, {
                                expiresIn: '1hr'
                            });

                            return response
                                    .status(200)
                                    .json({
                                        message: 'Authentication Successful',
                                        token
                                    });
                        }

                        response
                            .status(401)
                            .json({
                                message: 'Authentication Failed'
                            });
                    });
                } else {
                    response
                        .status(422)
                        .json({
                            message: 'Authentication Failed'
                        })
                }
            })
    }
};

module.exports = Users;