const express = require("express");
const router = express.Router();
const { DatabaseService } = require("../services/database.service");
const { auth } = require("../services/firebase.service");
router.post("/signup", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { uid, email, username } = req.body;
    console.log("user to save:", uid, email, username);
    const databaseService = new DatabaseService(db);
    await databaseService.saveUser(uid, email, username);
    res.status(200).send({ uid, email, username });
  } catch (err) {
    console.error("Error saving user:", err);
    if (err.uid) {
      try {
        await auth.deleteUser(err.uid);
        console.log(
          `Successfully deleted user: ${err.uid} because of error ${err.error}`
        );
      } catch (deleteError) {
        console.error("Error deleting user:", deleteError);
      }
    }
    res.status(500).send("Error saving user");
  }
});

module.exports = router;
