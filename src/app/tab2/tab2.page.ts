import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../core/services/photo/photo.service';
import { PhotoType } from '../core/types/photo-type';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {



  constructor(
    public photoService: PhotoService,
    private _asController: ActionSheetController
  ) {}

  async ngOnInit(): Promise<void> {
      await this.photoService.loadSaved()
  }

  /**
   * Take photo from the FAB Button
   * @see PhotoService
   */
  public addPhotoToGallery(): void {
    this.photoService.addPhotoToGallery()
  }

  public async showActionSheet(photo: PhotoType, index: number): Promise<void> {
    const actionSheet = await this._asController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.photoService.deletePhoto(photo, index)
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
              // Nope
          },
        }
      ]
    })

    await actionSheet.present()
  }

}
