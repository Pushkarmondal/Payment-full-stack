const express = require("express");
const router = express.Router();
const z = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../userModel");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config.js");
const { authMiddleware } = require("../middleware.js");

const userSchema = z.object({
  userName: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = userSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid data/Email already taken or password!",
      error: userSchema.safeParse(req.body).error.format(),
    });
  }

  const existingUser = await User.findOne({
    userName: req.body.userName,
  });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10); // 🔐 important for security

  const newUser = await User.create({
    userName: req.body.userName,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashedPassword,
  });

  const userId = newUser._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 1000000,
  });

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.status(201).json({
    message: "User Created",
    token: token,
  });
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userName: user.userName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const updateBody = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
  });
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Invalid data",
      error: updateBody.safeParse(req.body).error.format(),
    });
  }
  await User.updateOne(req.body, {
    id: req.userId,
  });
  res.json({
    message: "User updated successfully!",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter;

  let users;

  if (filter) {
    users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    });
  } else {
    users = await User.find(); // return all users if no filter
  }

  // res.json({ user: users });
  res.json({
    user: users.map((user) => ({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
