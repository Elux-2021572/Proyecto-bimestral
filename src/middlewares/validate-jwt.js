import jwt from "jsonwebtoken"
import User from "../user/user.model.js"

export const validateJWT = async (req, res, next) => {
    try{
        let token = req.body.token || req.query.token || req.headers["authorization"]

        if(!token){
            return res.status(400).json({
                success: false,
                message: "There is not token in the request"
            })
        }

        token = token.replace(/^Bearer\s+/, "")

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const user = await User.findById(uid)

        if(!user){
           return res.status(400).json({
                success: false,
                message: "User does not exist in the DataBase"
           }) 
        }

        if(user.status === false){
            return res.status(400).json({
                success: false,
                message: " Previously desactivated user"
            })
        }

        req.usuario = user
        next()
    }catch(err){
        return res.status(500).json({
            success: false,
            message : "Error validating Token",
            error: err.message
        })
    }
}