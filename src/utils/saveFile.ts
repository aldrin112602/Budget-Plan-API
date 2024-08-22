import path from "path";
import fs from "fs";

const saveFile = (file: Express.Multer.File): string => {
  const uploadDir = path.join(__dirname, "../../uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${Date.now()}-${file.originalname}`;
  const filePath = path.join(uploadDir, fileName);
  
  if (file.buffer) {
    fs.writeFileSync(filePath, file.buffer);
  } else {
    throw new Error("File buffer is undefined");
  }

  return `uploads/${fileName}`;
};

export default saveFile;
