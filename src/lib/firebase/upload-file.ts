import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./_app";
import { compressImage } from "../image.compress";

export const uploadFirebaseFile = async (file: File,profileId:string) => {
    try {
        const image = await compressImage(file, {})
        if(!image) return null

        const storageRef = ref(storage, `skylight/${profileId}/${image.file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image.file)
        await uploadTask;
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        return downloadURL
    } catch (error) {
        console.error(error, "error in uploadFirebaseFile");
        return null
    }
}
