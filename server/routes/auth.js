const express = require("express");
const router = express.Router();
const { DatabaseService } = require("../services/database.service");
const { auth } = require("../services/firebase.service");
const { verifyToken } = require("../middleware/verifyToken");
router.post("/signup", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { uid, email, username, authProvider } = req.body;
    console.log("user to save:", uid, email, username, authProvider);
    const databaseService = new DatabaseService(db);
    await databaseService.saveUser(uid, email, username, authProvider);
    res.status(200).send({ email, username });
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

router.post("/login", verifyToken, async (req, res) => {
  try {
    const uid = req.uid;
    const databaseService = new DatabaseService(req.app.locals.db);
    const { email, username } = await databaseService.getUserData(uid);
    res.status(200).send({ email, username });
  } catch (err) {
    console.error("Error retrieving user", err);
    res.status(500).send(err);
  }
});
module.exports = router;
