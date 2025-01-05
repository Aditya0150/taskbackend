const express = require("express");
const { signUp, login, sendFriendRequest, respondToFriendRequest } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/send-friend-request", sendFriendRequest);
router.post("/respond-friend-request", respondToFriendRequest);

module.exports = router;