import prisma from "../config/prisma";

// Function to get a user by ID
const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");
  return user;
};

// Function to update a user profile
const setUserProfile = async (body: any) => {
  const { userId, profileData } = body;

  // Find the user by ID
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  // Check if the user has a profile
  const existingProfile = await prisma.profile.findUnique({ where: { userId } });

  // Update the profile if it exists, otherwise create a new one
  let updatedProfile;
  if (existingProfile) {
    updatedProfile = await prisma.profile.update({
      where: { userId },
      data: profileData,
    });
  } else {
    updatedProfile = await prisma.profile.create({
      data: {
        userId,
        ...profileData,
      },
    });
  }

  return updatedProfile;
};

export default { getUserById, setUserProfile };
