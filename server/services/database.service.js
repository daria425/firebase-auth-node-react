class DatabaseService {
  constructor(db) {
    this.usersCollection = db.collection("users");
  }

  async saveUser(uid, email, username, authProvider) {
    try {
      const userRecord = {
        uid,
        email,
        username,
        authProvider,
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
  async getUserData(uid) {
    try {
      const user = await this.usersCollection.findOne({ uid: uid });
      if (user) return user;
      else {
        throw new Error(`User with uid ${uid} not found`);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { DatabaseService };
