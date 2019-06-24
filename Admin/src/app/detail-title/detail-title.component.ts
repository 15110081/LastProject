import { Component, OnInit } from '@angular/core';
import { Title } from 'src/model/title';
import { Observable } from 'rxjs';
import { UploadFileService } from '../service/upload-file.service';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../service/title.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-title',
  templateUrl: './detail-title.component.html',
  styleUrls: ['./detail-title.component.scss']
})
export class DetailTitleComponent implements OnInit {
  data: any;
  fileUpload:Observable<any>;
  selectedTitle=new Title(null,"","","","","");
  file:any;
  public messageImage: string;
  selectedFilesImage: FileList;
  constructor(private uploadService:UploadFileService,private route:ActivatedRoute,private titleService:TitleService, private location:Location,private token:TokenStorageService) { }

  ngOnInit() {
    this.getTitleFromRoute();
  }
  getTitleFromRoute(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
    //Call service to "get movie from id" ?
    this.titleService.getTitleFromId(id, this.token.getToken()).subscribe(
      res => {
        this.selectedTitle = res["data"];
        // this.data=res["data"];
        console.log("Data detail:" + JSON.stringify(this.selectedTitle));
        this.file="http://localhost:9059/upload/filetitle/"+this.selectedTitle["imageTitle"];
        console.log(this.file);
      }

    );
  }
  preview(files, event) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.messageImage = "Only images are supported.";
      this.file = "";
      return;
    }
    this.messageImage = "";
    this.selectedFilesImage = event.target.files;
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.file = reader.result;
    }
  }
  goBack(): void {
    this.location.back();
  }
  uploadImage(id:number){
    this.uploadService.updatePushFileTitleToStorage(this.selectedFilesImage.item(0),
     this.token.getToken(),id).toPromise();

}
updateTitle(id:number){
  var temp=(<HTMLInputElement> document.getElementById("inputImage")).value;
  if(temp!=this.selectedTitle.imageTitle) {
    this.selectedTitle.imageTitle=temp;
    this.uploadImage(this.selectedTitle.id);
  }
  this.titleService.putTitle(id,this.selectedTitle,this.token.getToken()).subscribe(
    data => {
      console.log(data);
    },
    error => console.log(error));
 this.goBack();
}
deleteTitle(id: number) {
  this.titleService.deleteTitle(id,this.token.getToken());
 
 this.goBack();
}

}
