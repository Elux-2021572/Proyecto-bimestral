import User from "./user.model.js"

export const updateRol = async (req, res) => {
    try{
        const { idUser, rol } = req.body;

        const user = await User.findById(idUser);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User nor found",
            });
        }

        user.role = rol;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Update Rol',
            user,
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error updating Role',
            error: error.message
        })
    }
}

export const updateUser = async(req, res) => {
    try{
        const {idUser, ...data} = req.body;

        const user = await User.findByIdAndUpdate(idUser, data, { new: true });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: 'Update User',
            user,
        })    
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error updating Role',
            error: error.message
        })
    }
}

export const deleteUser = async(req, res) => {
    try{
        const { idUser } = req.body

        const user = await User.findByIdAndDelete(idUser);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: 'Delete User',
            user,
        })   
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error deleting Role',
            error: error.message
        })
    }
}