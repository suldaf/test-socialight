const ChallengeController = require("../controllers/challengeController");
const SubmissionController = require("../controllers/submissionController");
const UserController = require("../controllers/userController");
const { authenticate } = require("../middlewares/authenticate");
const {
  initiatorAuthorize,
  participantAuthorize,
} = require("../middlewares/authorize");

const routes = require("express").Router();

routes.post("/users/login", UserController.login);
routes.use(authenticate);
routes.get("/users", UserController.showAll);
routes.get("/users/:id", UserController.show);
routes.post("/users", UserController.create);

routes.get("/challenges", initiatorAuthorize, ChallengeController.show);
routes.post("/challenges", initiatorAuthorize, ChallengeController.create);

routes.get(
  "/challenges/:id",
  initiatorAuthorize,
  ChallengeController.countReward
);

routes.patch(
  "/submissions/:id",
  initiatorAuthorize,
  SubmissionController.approval
);
routes.get(
  "/submissions/challenges",
  participantAuthorize,
  ChallengeController.showForParticipant
);

routes.get("/submissions", participantAuthorize, SubmissionController.show);
routes.post("/submissions", participantAuthorize, SubmissionController.create);

module.exports = routes;
