import User from "../models/User.js";

class UserController {

    async store(req, res) {
        let image ='';
        if(req.file){
            image=req.file.filename;
        }
        const user = new User({...req.body, image});
        await user.save();
        return res.status(200).json(user);
    }
    async index(request, response) {
        const users = await User.find({});
        response.status(200).json({ users });
    }
    async show(req, res) {
        let id= req.params.id;
        let user= await User.findById(id);
        return res.json({user});
    }
    async destroy(req, res){
        let id=req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({ message: "User deleted successfully" });
    }
    async update(req,res){
        let id = req.params.id;x``
        let data = req.body;
        await User.updateOne({ _id: id },{$set: data})
        return res.status(200).json({ message: "User updated successfully" });
    }
}
export default UserController;