import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Connessione al database
mongoose.connect(process.env.MONGO_URI);

// Modello utente
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  saldo: Number,
  richieste: Array
});
const User = mongoose.model("User", UserSchema);

// API di esempio: aggiungi bonus
app.post("/api/users/:id/bonus", async (req, res) => {
  const { amount } = req.body;
  const user = await User.findById(req.params.id);
  user.saldo += amount;
  await user.save();
  res.json({ success: true, saldo: user.saldo });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server pronto");
});
"type": "module"
