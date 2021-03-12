import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    },
    process.env.JWT_SECRET || "secret"
  );

  return token;
};

export default generateToken;
