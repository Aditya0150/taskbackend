const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error creating user." });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id }, "your_secret_key", { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in." });
  }
};

const sendFriendRequest = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const friend = await User.findById(friendId);
    if (!friend) return res.status(404).json({ error: "User not found!" });

    if (friend.friendRequests.includes(userId)) {
      return res.status(400).json({ error: "Friend request already sent." });
    }

    friend.friendRequests.push(userId);
    await friend.save();
    res.status(200).json({ message: "Friend request sent!" });
  } catch (error) {
    res.status(500).json({ error: "Error sending friend request." });
  }
};

const respondToFriendRequest = async (req, res) => {
  const { userId, friendId, action } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) return res.status(404).json({ error: "User not found!" });

    if (action === "accept") {
      user.friends.push(friendId);
      friend.friends.push(userId);
    }

    user.friendRequests = user.friendRequests.filter((id) => id.toString() !== friendId);
    await user.save();
    await friend.save();

    res.status(200).json({ message: `Friend request ${action}ed.` });
  } catch (error) {
    res.status(500).json({ error: "Error responding to friend request." });
  }
};


