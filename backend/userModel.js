const mongoose = require('mongoose');

mongoose.connect(
  "Your_MongoDB_URL"
);

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, unique: true },
  firstName: { type: String, required: true, maxLength: 30 },
  lastName: { type: String, required: true, maxLength: 30 },
  password: { type: String, unique: true, required: true },
});

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0, required: true },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account
}
