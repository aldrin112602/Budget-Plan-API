import prisma from "../config/prisma";
import saveFile from "../utils/saveFile";

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");
  return user;
};  


const setUserProfile = async (body: any, file?: Express.Multer.File) => {
  const { userId } = body;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  let profileData: any = { };

  if (file) {
    const avatarUrl = saveFile(file);
    profileData.avatarUrl = avatarUrl;
  }

  const existingProfile = await prisma.profile.findUnique({ where: { userId } });

  let userProfile;

  if (existingProfile) {
    userProfile = await prisma.profile.update({
      where: { userId },
      data: profileData,
    });
  } else {
    userProfile = await prisma.profile.create({
      data: {
        userId,
        ...profileData,
      },
    });
  }

  return userProfile;
};


export default { getUserById, setUserProfile };
