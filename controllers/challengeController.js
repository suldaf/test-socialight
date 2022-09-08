const { Challenge, Submission, Reward } = require("../models");
const { lt } = require("sequelize").Op;
class ChallengeController {
  static async create(req, res) {
    try {
      const { name, budget, brief, deadline } = req.body;
      const data = await Challenge.create({
        name,
        budget: +budget,
        brief,
        deadline: deadline || null,
        status: "0",
        UserId: +req.currentUser.id,
      });
      return res
        .status(201)
        .json({ message: "success create challenge", data });
    } catch (e) {
      return res.send(e);
    }
  }

  static async show(req, res) {
    try {
      const data = await Challenge.findAll({
        where: { UserId: req.currentUser.id },
        include: [Submission],
      });
      return res
        .status(200)
        .json({ message: "success get data challenges", data });
    } catch (e) {
      return res.json(e);
    }
  }

  static async showForParticipant(req, res) {
    try {
      const data = await Challenge.findAll();
      return res
        .status(200)
        .json({ message: "success get data challenge", data });
    } catch (e) {
      return res.json(e);
    }
  }

  static async countReward(req, res) {
    try {
      const challengeId = +req.params.id;
      const submission = await Submission.findAll({
        where: { ChallengeId: challengeId },
      });
      // const test = await Reward.findOne({
      //   where: { min_views: { [lt]: 4200 } },
      //   order: [["min_views", "DESC"]],
      // });
      // console.log(test);
      const result = [];
      for (const data of submission) {
        data["tier"] = 0;
        data["reward"] = 0;
        const reward = await Reward.findOne({
          where: { min_views: { [lt]: data.view_count } },
          order: [["min_views", "DESC"]],
        });
        data["tier"] = reward.tier;
        data["reward"] = reward.reward_amount;
        console.log(data);
      }

      return res.json({ data: submission });
    } catch (e) {
      return res.json(e);
    }
  }
}

module.exports = ChallengeController;
