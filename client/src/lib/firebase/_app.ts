import { configs } from "@/configs";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const app = initializeApp(configs.firebase);
export const storage = getStorage(app);
