"use client"
import { UploadForm } from "./(form)/form.js"

export default function Page(){
    return (
        <>
         <h1>Upload Files to S3 bucket</h1>
         <UploadForm />
        </>
    )
}