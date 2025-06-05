import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { auth } from "@clerk/nextjs/server";


// Cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

interface CloudinaryUploadResult {
    public_id: string;
    [key: string]: any;
}



export async function POST(request: NextRequest) {
    try {

        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        

        const formData = await request.formData();

        const file = formData.get("file") as File | null

        if (!file) {
            return NextResponse.json({ error: "Image file not found." }, { status: 400 });
        }


        const bytes = await file.arrayBuffer();
        const fileBuffer = Buffer.from(bytes);


        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {folder: "cloudinary-saas/images"},
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                        
                    },
                )
                uploadStream.end(fileBuffer);
            }
        )
        console.log(result)


        return NextResponse.json(
            { 
                public_id: result.public_id,
                msg: "Image uploaded successfully",
            }, 
            { status: 200 }
        );
    } catch (error) {
        console.error("Error while uploading image: ", error);
        return NextResponse.json(
            { error: "Error while uploading image. Please try again later." },
            { status: 500 }
        )
    }
}