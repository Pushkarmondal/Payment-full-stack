const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../userModel");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const z = require("zod");

const transferSchema = z.object({
  to: z.string().min(1, "Recipient ID is required"),
  amount: z.coerce.number().positive("Amount must be a positive number"),
});

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account?.balance || 0,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  // Validate input
  const result = transferSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request",
      errors: result.error.flatten(),
    });
  }

  const { to, amount } = result.data;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const account = await Account.findOne({
      userId: req.userId,
    }).session(session);

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({
      userId: to,
    }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();
    res.json({ message: "Transfer successful" });
  } catch (err) {
    await session.abortTransaction();
    console.error("Transfer failed:", err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    session.endSession();
  }
});

module.exports = router;
