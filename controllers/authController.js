const User = require('../models/userModel')
const bcrypt = require('bcrypt')

exports.signUp = async (req, res, next) => {
    try {
        const {username, password} = req.body
        const hashPassword = await bcrypt.hash(password, 12)

        const user = await User.create({
            username,
            password: hashPassword
        })
        res.status(201).json({
            status: "success",
            data: {
                user
            }
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({status: "fail"})
    }
}

exports.login = async (req, res, next) => {
    try {
        const {username, password} = req.body
    
        const user = await User.findOne({username})


        if (!user) {
            return res.status(401).json({ status: "fail", msg: "user not found"})
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (isValid) {
            return res.status(200).json({
                status: "success"
            })
        } else {
            res.status(400).json({ status: "fail", message: "username or password is incorrect"})
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({status: "fail"})
    }
}