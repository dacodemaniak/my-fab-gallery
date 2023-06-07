import { Injectable } from '@angular/core';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera'
import { PhotoType } from '../../types/photo-type';
import { Base64Helper } from './base64-helper';
import { Directory, Filesystem } from '@capacitor/filesystem';

import { environment } from './../../../../environments/environment';
import { Preferences } from '@capacitor/preferences';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

    /**
   * Photos list
   * @var Array<PhotoType>
   */
  private _photos: PhotoType[] = []
  
  /**
   * @var {string}
   * @see environment
   */
  private readonly _PHOTO_STORAGE = environment.photoStorage

  constructor() { }

  public async addPhotoToGallery() {
    const capture = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })

    // Save image and got it back
    const savedCapture = await this._savePicture(capture)

    // Store pic in the photo array
    // pic will be stored at the beginning of the array
    this._photos.unshift(savedCapture)

    // Use Preferences Capacitor to store datas
    // Default fallback to IndexedDB storage
    Preferences.set({
      key: this._PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    })
  }

  public get photos(): Array<PhotoType> {
    return this._photos
  }

  public async loadSaved() {
    const { value } = await Preferences.get({key: this._PHOTO_STORAGE})

    this._photos = (value ? JSON.parse(value) : []) as PhotoType[]

    // Retreive photos
    // Use reference of objects so no need to replace photo in array
    for (let photo of this._photos) {
      const readFile = await Filesystem.readFile({
        path: photo.filePath,
        directory: Directory.Data
      })

      // Convert to inline base64
      photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`
    }
  }
  /**
   * Convert resource to file and save it to filesystem (web process)
   * 
   * @param photo 
   * @returns Promise
   */
  private async _savePicture(photo: Photo) {
    const base64Data = await Base64Helper.readAsBase64(photo)

    // Create a file name
    const fileName = 'gallery_' + new Date().getTime() + '.jpeg'

    // Use Filesystem capacitor API to store image
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    })

    // Returns the saved file infos
    return {
      filePath: fileName,
      webviewPath: photo.webPath
    }
  }
}
