"use server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

const uploadClient = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION!,
  credentials: {
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY!,
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID!,
  },
});
const uploadToS3 = async (file: Buffer, filename: string) => {
  const fileBuffer = file;
  const params = {
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `${filename}`,
    Body: fileBuffer,
    ContentType: "image/jpeg",
  };
  const command = new PutObjectCommand(params);
  try {
    const response = await uploadClient.send(command);
    console.log(response);
    return filename;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export async function uploadFile(prevState: any, formData: any) {
  try {
    const file = formData.get("file");
    console.log(file);
    if (!file || file.size === 0) {
      return { status: "error", message: "Please add a file!" };
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    await uploadToS3(buffer, file.name);
    revalidatePath("/");
    return { status: "success", message: "File has been uploaded" };
  } catch (err) {
    console.log(err);
    return { status: "error", message: "File has not been uploaded" };
  }
}
