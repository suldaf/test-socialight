const { Submission } = require("../models");
const { in: opIn } = require("sequelize").Op;
class SubmissionController {
  static async create(req, res) {
    try {
      const userId = req.currentUser.id;
      const { post_url, challengeId } = req.body;
      const submission = await Submission.findOne({
        where: {
          UserId: userId,
          ChallengeId: challengeId,
          status: {
            [opIn]: ["approval", "approved"],
          },
        },
      });
      if (submission) {
        return res.status(403).json({
          message:
            "have a submission approved or approval, please submit in another challenge",
        });
      } else {
        const data = await Submission.create({
          post_url,
          status: "approval",
          ChallengeId: challengeId,
          UserId: userId,
        });
        return res
          .status(201)
          .json({ message: "success create submission", data });
      }
    } catch (e) {
      return res.json(e);
    }
  }
  static async show(req, res) {
    try {
      const { challengeId } = req.body;
      const data = await Submission.findAll({
        where: { UserId: req.currentUser.id, ChallengeId: challengeId },
      });
      if (data.length) {
        return res
          .status(200)
          .json({ message: "succes get data submission", data });
      } else {
        return res.status(403).json({ message: "submission not found" });
      }
    } catch (e) {
      return res.json(e);
    }
  }

  static async approval(req, res) {
    try {
      const submissionId = +req.params.id;
      const { status, challengeId } = req.body;
      const submission = await Submission.findOne({
        where: {
          id: submissionId,
          ChallengeId: challengeId,
          status: {
            [opIn]: ["approved", "rejected"],
          },
        },
      });
      if (submission) {
        return res
          .status(401)
          .json({ message: "submission have been approved/rejected" });
      } else {
        await Submission.update(
          { status },
          { where: { id: submissionId, ChallengeId: challengeId } }
        );
        return res.status(200).json({ message: `submission ${status}` });
      }
    } catch (e) {
      return res.json(e);
    }
  }
}

module.exports = SubmissionController;
