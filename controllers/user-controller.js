const {Users} = require('../models/')

module.exports = {
    async getUsers(req,res) {
        try{
            const users = await Users.find();
            return res.json(users);
        }catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getSingleUser(req,res) {
        try{
            const users = await Users.findOne( {_id: req.params.userId} )
            .select('-__v')
            .lean();

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID'})
            }

            res.json(user);
        }catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async createUser(req,res) {
        try{ 
            const user = await Users.create(req.body);
            res.json(user);
        }catch (err){
            console.log(err);
            res.status(500).json
        }
    },
    async updateUser(req,res){
        try{
            const user = await Users.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true },
                { new: true } 
            )
            if (!user) {
                return res.status(404).json({ message: "No user with this id!" });
              }
            
            res.json(user)
        }catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },


}