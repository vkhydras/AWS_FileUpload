"use server";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Content } from "next/font/google";

// NEXT_AWS_S3_BUCKET_NAME

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY,
  },
});

async function uploadFileToS3(file, filename) {
  const fileBuffer = file;

  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    key: `${filename}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  try {
    const response = await await s3Client.send(command);
    console.log("File upload succefully: ", response);

    return filename;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(prevState, formData) {
  try {
    const file = formData.get("file");
    if (file.size === 0)
      return {
        status: "error",
        message: "Plaesse select a file",
      };

    const buffre = Buffer.from(await file.arrayBuffer());
    await uploadFileToS3(buffer, file.name);

    console.log(file);

    revalidatePath("/");
    return { status: "success", message: "File has been uploaded" };
  } catch (error) {
    return { status: "error", message: "Failed to upload file" };
  }
}
