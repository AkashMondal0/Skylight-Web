import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./_app";

export const uploadFirebaseFile = async (file: File,profileId:string) => {
    try {
        const storageRef = ref(storage, `skyMedia/${profileId}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file)
        await uploadTask;
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        return downloadURL
    } catch (error) {
        console.error(error, "error in uploadFirebaseFile");
        return null
    }
}
