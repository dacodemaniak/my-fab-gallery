import { Component } from '@angular/core';
import { PhotoService } from '../core/services/photo/photo.service';
import { PhotoType } from '../core/types/photo-type';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {



  constructor(
    public photoService: PhotoService
  ) {}

  /**
   * Take photo from the FAB Button
   * @see PhotoService
   */
  public addPhotoToGallery(): void {
    this.photoService.addPhotoToGallery()
  }

}
