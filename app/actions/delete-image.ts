import { utapi } from "uploadthing/server";

export default async function deleteImage(fileName: string) {
    try {
        await utapi.deleteFiles(fileName);
    } catch (error) {
        console.log(error);
    }
}