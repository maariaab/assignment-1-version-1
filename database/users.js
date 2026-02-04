const { mysqlPool: database } = include('databaseConnection');

async function createUser(postData) {
  const createUserSQL = `
    INSERT INTO users (username, password)
    VALUES ('${postData.user}', '${postData.hashedPassword}');
  `;

  try {
    const results = await database.query(createUserSQL);
    console.log("Successfully created user");
    console.log(results);
    return true;
  } catch (err) {
    console.log("Error inserting user");
    console.log(err);
    return false;
  }
}



async function getUserByUsername(postData) {
  console.log("This is user string literal: " + postData);
  
  const sql = "SELECT * FROM users WHERE username = '" + postData.user + "'";
  const params = { user: postData.user };

  try {
    const [rows] = await database.query(sql); 
    return rows; 
  } catch (err) {
    console.log("Error finding user by username");
    console.log(err);
    return false;
  }
}

module.exports = {createUser, getUserByUsername};


