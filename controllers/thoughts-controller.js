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
}