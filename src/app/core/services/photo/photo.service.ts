import { Injectable } from '@angular/core';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { PhotoType } from '../../types/photo-type';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

    /**
   * Photos list
   * @var Array<PhotoType>
   */
  private _photos: PhotoType[] = []
    
  constructor() { }

  public async addPhotoToGallery() {
    const capture = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })

    // Store pic in the photo array
    // pic will be stored at the beginning of the array
    this._photos.unshift({
      filePath: 'Will coming soon...',
      webviewPath: capture.webPath
    })
  }

  public get photos(): Array<PhotoType> {
    return this._photos
  }
}
