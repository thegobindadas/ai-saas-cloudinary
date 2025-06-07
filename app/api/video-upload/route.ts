import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient()


// Cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


interface CloudinaryUploadResult {
    public_id: string;
    bytes: number;
    duration?: number;
    [key: string]: any;
}



export async function POST(request: NextRequest) {
    try {
/*
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized to upload video." }, { status: 401 });
        }
        
*/
        if (
            !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
            !process.env.CLOUDINARY_API_KEY ||
            !process.env.CLOUDINARY_API_SECRET
        ) {
            return NextResponse.json({ error: "Cloudinary credentials not found." }, { status: 500 });
        }


        const formData = await request.formData();

        const file = formData.get("file") as File | null
        const title = formData.get("title") as string
        const description = formData.get("description") as string
        const originalSize = formData.get("originalSize") as string

        if (!file) {
            return NextResponse.json({ error: "Video file not found." }, { status: 400 });
        }

        if (file.type !== "video/mp4") {
            return NextResponse.json({ error: "Only MP4 video files are supported." }, { status: 400 });
        }

        if (!title || !description || !originalSize) {
            return NextResponse.json({ error: "Title or description not found." }, { status: 400 });
            
        }


        const bytes = await file.arrayBuffer();
        const fileBuffer = Buffer.from(bytes);


        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "video",
                        folder: "cloudinary-saas/videos",
                        transformation: [
                            {
                                quality: "auto",
                                fetch_format: "mp4",
                            }
                        ]
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                        
                    },
                )
                uploadStream.end(fileBuffer);
            }
        )


        const video = await prisma.video.create({
            data: {
                title,
                description,
                publicId: result.public_id,
                originalSize,
                compressedSize: String(result.bytes),
                duration: result.duration || 0,
            }
        })



        return NextResponse.json(
            { 
                video,
                msg: "Video uploaded successfully",
            }, 
            { status: 200 }
        );

    } catch (error) {
        console.error("Error while uploading video: ", error);
        return NextResponse.json(
            { error: "Error while uploading video. Please try again later." },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect();
    }
}