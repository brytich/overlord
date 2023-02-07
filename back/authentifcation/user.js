const bcrypt = require('bcrypt');

const User = class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async save() {
    this.password = await bcrypt.hash(this.password, 10);
    // Sauvegardez l'utilisateur dans la base de données
  }

  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
};

module.exports = User;