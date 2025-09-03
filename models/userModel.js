class UserModel {
  constructor() {
    this.users = [
      { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
    ];
    this.nextId = 4;
  }

  // Get all users
  getAllUsers() {
    return this.users;
  }

  // Get user by ID
  getUserById(id) {
    return this.users.find(user => user.id === parseInt(id));
  }

  // Create new user
  createUser(userData) {
    const newUser = {
      id: this.nextId++,
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      age: parseInt(userData.age)
    };
    
    this.users.push(newUser);
    return newUser;
  }

  // Update user
  updateUser(id, userData) {
    const user = this.getUserById(id);
    if (!user) return null;

    user.name = userData.name.trim();
    user.email = userData.email.trim().toLowerCase();
    user.age = parseInt(userData.age);
    
    return user;
  }

  // Partially update user
  patchUser(id, updates) {
    const user = this.getUserById(id);
    if (!user) return null;

    Object.assign(user, updates);
    return user;
  }

  // Delete user
  deleteUser(id) {
    const userIndex = this.users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) return null;

    return this.users.splice(userIndex, 1)[0];
  }

  // Check if email exists
  emailExists(email, excludeId = null) {
    return this.users.find(user => 
      user.email === email.trim().toLowerCase() && 
      (excludeId ? user.id !== excludeId : true)
    );
  }
}

// Create singleton instance
const userModel = new UserModel();
module.exports = userModel;
