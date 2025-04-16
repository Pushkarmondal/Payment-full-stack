const mongoose = require('mongoose');

mongoose.connect(
  "mongodb://nishitm060:Pushkar12345@cluster0-shard-00-00.cz8kv.mongodb.net:27017,cluster0-shard-00-01.cz8kv.mongodb.net:27017,cluster0-shard-00-02.cz8kv.mongodb.net:27017/?replicaSet=atlas-ly70cl-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
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