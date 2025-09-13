const { findUser, createUser } = require("../repositories/userRepository");

async function registerUser(userDetails) {
  //it will create a brand new user in the db
  // 1- we need to check if the user with this email and mobile number already exists or not
  const user = await findUser({
    email: userDetails.email,
    mobileNumber: userDetails.mobileNumber,
  });

  if (user) {
    //we found user
    throw {
      reson: "user with the given email and mobile number already exist",
      statusCode: 400,
    };
  }

  //if not then create the user in the database

  const newUser = await createUser({
    email: userDetails.email,
    password: userDetails.password,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    mobileNumber: userDetails.mobileNumber,
  });

  if (!newUser) {
    throw {
      reson: "Something went wrong, cannot create user",
      statusCode: 500,
    };
  }
}

module.exports = {
  registerUser,
};
