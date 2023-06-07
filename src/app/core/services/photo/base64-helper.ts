import { Photo } from "@capacitor/camera";
import { PhotoType } from "../../types/photo-type";
import { Platform } from "@ionic/angular";
import { Filesystem } from "@capacitor/filesystem";

/**
 * Usefull methods to convert blobs to file
 * @author DaCoDeMaNiaK <jean-luc.aubert@aelion.fr>
 * @version 1.0.0
 */
export class Base64Helper {
    /**
     * 
     * @param {Photo} photo 
     * @returns Promise
     */
    public static async readAsBase64(photo: Photo, platform: Platform) {
        if (platform.is('hybrid')) {
            // App runs on Capacitor or Cordova device
            const file = await Filesystem.readFile({
                path: photo.path!
            })
            return file.data
        } else {
            // Native fetch is used to get the response from photo detail
            const response = await fetch(photo.webPath!)

            // Get a Binary Large Object (blob) from the response
            const blob = await response.blob()

            return await Base64Helper.convertBlobToBase64(blob) as string
        }
    }

    /**
     * 
     * @param blob 
     * @returns Promise
     */
    private static convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onerror = reject

        reader.onload = () => {
            resolve(reader.result)
        }

        reader.readAsDataURL(blob)
    })

}