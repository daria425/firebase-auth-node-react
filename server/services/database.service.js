class DatabaseService {
  constructor(db) {
    this.usersCollection = db.collection("users");
  }

  async saveUser(uid, email, username) {
    try {
      const userRecord = {
        uid,
        email,
        username,
      };
      await this.usersCollection.insertOne(userRecord);
    } catch (e) {
      console.log("error saving user", e);
      throw {
        error: e,
        uid,
      };
    }
  }
}

module.exports = { DatabaseService };
