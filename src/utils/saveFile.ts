import path from "path";
import fs from "fs";

const saveFile = (file: Express.Multer.File): string => {
  const uploadDir = path.join(__dirname, "../../uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const filePath = path.join(uploadDir, `${Date.now()}-${file.originalname}`);
  fs.writeFileSync(filePath, file.buffer);

  return filePath;
};


export default saveFile;