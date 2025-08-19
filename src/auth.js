const { usersContainer } = require("./cosmos");

// Fetch or create user, then return role
async function getUserRole(user) {
  const { resources: existing } = await usersContainer.items
    .query(`SELECT * FROM c WHERE c.email = "${user.email}"`)
    .fetchAll();

  if (existing.length === 0) {
    // If new user, insert into DB with default role
    const newUser = {
      id: user.email, // use email as unique ID
      email: user.email,
      name: user.name,
      role: "Customer",  // default role
      createdAt: new Date().toISOString()
    };
    await usersContainer.items.create(newUser);
    return newUser.role;
  }

  return existing[0].role;
}

module.exports = { getUserRole };
