import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

const register = async (userData: any) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });
  if (existingUser) throw new Error("Email already in use");

  const salt = 10;
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const user = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
  });

  return authResponse(user);
};

const login = async (userData: any) => {
  const { email, password } = userData;

  if(!email || !password) throw new Error('All fields are required');

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("User not found");
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Invalid credentials");
  return authResponse(user);
};


const authResponse = async (user: any) => {
  console.log(user)
  const token = await jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    token,
    user,
  };

}

export default { register, login };
