import { utapi } from "uploadthing/server";


export default async function deleteImage(fileUrl: string) {
    const fileName = fileUrl.split('/').pop() as string
    try {
        await utapi.deleteFiles(fileName)
    } catch (error) {
        console.log(error);
    }
}