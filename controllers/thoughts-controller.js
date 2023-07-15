const { Thoughts } = require("../models");

const reactionCount = async () => {
  const numberOfReactions = await Thoughts.aggregate().count("reactionCount");
  return numberOfReactions;
};

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      const thoughtObj = {
        thoughts,
        reactionCount: await reactionCount(),
      };
      return res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleThought(req,res){
    try{
        const thought = await Thoughts.findOne({ _id:req.params.thoughtId })
        .select('-__v')
        .lean();

        if(!thought){
            return res.status(404).json({ message: 'No thought found with that ID' })
        }
        res.json(thought);
    }catch (err){
        console.log(err);
        return res.status(500).json(err)
    }
  },

  async createThought(req,res){
    try{
        const thought = await Thoughts.create(req.body);
        res.json(thought)
    }catch(err){
        console.log(err);
        return res.status(500).json(err)
    }
  },

  async updateThought(req,res){
    try{
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body},
            { runValidators: true, new: true },
        )
        if(!thought){
            return res.status(404).json({ message: 'No thought found with that ID' }) 
        }
        res.json(thought)
    }catch(err){
        console.log(err);
        return res.status(500).json(err)
    }
  },

  async deleteThought(req,res){
    try{
        const thought = await Thoughts.findOneAndRemove({ _id: req.params.thoughtId });
        if(!thought){
            return res.status(404).json({ message: 'No thought found with that ID' })
        }
        res.json({ message: 'Successfully deleted thought' })
    }catch{
        console.log(err);
        return res.status(500).json(err) 
    }
  },

  async addReaction(req,res){
    try{
        console.log("You are adding a reaction");
        console.log(req.body);
        const thought = await Thoughts.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body} },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res
            .status(404)
            .json({ message: "No thought found with that ID" });
        }
        res.json(thought);
    }catch{
        res.status(500).json(err)
    }
  },

  async deleteReaction(req,res){
    try{
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.body.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No user found with that ID :(" });
      }

      res.json(thought);
    }catch{
      res.status(500).json(err);
    }
  }
}