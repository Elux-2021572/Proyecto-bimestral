import { body, param } from "express-validator";
import { emailExists, usernameExists, userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("The name is required"),
    body("username").notEmpty().withMessage("The username is required."),
    body("email").notEmpty().withMessage("The email is required"),
    body("email").isEmail().withMessage("This is not a valid email"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("This is not a valid email"),
    body("username").optional().isString().withMessage("Username is in the wrong format"),
    body("password").isLength({min: 4}).withMessage("The password must contain at least 8 characters"),
    validarCampos,
    handleErrors
]

export const updateRolValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid", "It is not a valid ID").isMongoId(),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const getUserByIdValidator = [
    param("uid").isMongoId().withMessage("Not a valid MongoDB ID"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const deleteUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("Not a valid MongoDB ID"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const updatePasswordValidator = [
    param("uid").isMongoId().withMessage("Not a valid MongoDB ID"),
    param("uid").custom(userExists),
    body("newPassword").isLength({min: 8}).withMessage("The password must contain at least 8 characters"),
    validarCampos,
    handleErrors
]

export const updateUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid", "Not a valid MongoDB ID").isMongoId(),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const updateProfilePictureValidator = [
    param("uid").isMongoId().withMessage("Not a valid MongoDB ID"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

