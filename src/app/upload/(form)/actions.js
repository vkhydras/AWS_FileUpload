"use server"
import { revalidatePath } from "next/cache"
import { S3Client, PutObjectAclCommand } from "@aws-sdk/client-s3"


// NEXT_AWS_S3_BUCKET_NAME 

const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION,
    credentials:{
        accessKeyId:process.env.NEXT_AWS_S3_ACCESS_KEY_ID ,
        secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY,
    }
})

export async function uploadFile (prevState, formData){
    try {

        const file = formData.get('file')
        if(file.size === 0) return {
            status:"error",message:"Plaesse select a file"
        }

        console.log(file)

        revalidatePath("/")
        return {status: "success", message:"File has been uploaded"}
    } catch (error) {
        return {status:"error",message:"Failed to upload file"}
    }
}