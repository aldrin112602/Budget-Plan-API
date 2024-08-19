import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (userData: any) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
  });
  return user;
};

const login = async (userData: any) => {
  const user = await prisma.user.findUnique({ where: { email: userData.email } });
  if (!user) throw new Error('User not found');

  const validPassword = await bcrypt.compare(userData.password, user.password);
  if (!validPassword) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return token;
};

export default { register, login };
