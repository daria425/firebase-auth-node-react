const { auth } = require("../services/firebase.service");
const { DatabaseService } = require("../services/database.service");
const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];
  if (!idToken) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.uid = decodedToken.uid;
    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    res.status(403).send("Forbidden");
  }
};

module.exports = {
  verifyToken,
};
