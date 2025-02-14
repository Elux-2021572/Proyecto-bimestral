import { Router } from "express"
import { deleteUser, updateRol, updateUser } from "./user.controller.js"
import { deleteUserValidator, updateRolValidator, updateUserValidator } from "../middlewares/user-validators.js"

const router = Router()

router.patch("/updateRol/:uid", updateRolValidator, updateRol)
router.put("/updateUser/:uid",updateUserValidator, updateUser)
router.delete("/deleteUser/:uid",deleteUserValidator, deleteUser)

export default router

