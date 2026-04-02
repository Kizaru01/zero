import { NextResponse } from 'next/server';
import { handleUpload, HandleUploadBody } from '@vercel/blob/client';
import { auth } from "@clerk/nextjs/server";
import { MAX_FILE_SIZE } from '@/lib/constants';

export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;

    try {
        const jsonResponse = await handleUpload({
            token: process.env.bookfield_READ_WRITE_TOKEN,
            request,
            body,
            onBeforeGenerateToken: async () => {

                const { userId} = await auth();
                
                if(!userId) throw new Error("Unauthorized");

                return {
                    allowedContentTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
                    maximumSizeInBytes: MAX_FILE_SIZE, // 100MB
                    addRandomSuffix: true,
                    tokenPayload: JSON.stringify({ userId }),
                }
            },
            onUploadCompleted: async ({ blob, tokenPayload}) => {
                console.log("Upload completed for blob:", blob);

                const payload = tokenPayload ? JSON.parse(tokenPayload) : null

                const userId = payload?.userId;

                // TOdo post hog
            }
        })
                return NextResponse.json(jsonResponse);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        const status = message.includes('Unauthorized') ? 401 : 500;
        return NextResponse.json({ success: false, error: message }, { status: status });
        
    }
}