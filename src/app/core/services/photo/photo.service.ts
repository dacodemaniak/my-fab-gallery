import { Injectable } from '@angular/core';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  public async addPhotoToGallery() {
    const capture = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })
  }
}
