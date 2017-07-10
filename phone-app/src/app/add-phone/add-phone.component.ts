import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Subject }    from 'rxjs/Subject';

@Component({
  selector: 'app-add-phone',
  templateUrl: './add-phone.component.html',
  styleUrls: ['./add-phone.component.css']
})

export class AddPhoneComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: `http://localhost:3000/api/upload`
  });

  newPhone = {
    name: '',
    brand: '',
    specs: []
  };

  feedback: string;

  constructor() { }

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = response;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      console.log("onErrorItem");
      this.feedback = response;
    };
  }

  submit() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('name', this.newPhone.name);
      form.append('brand', this.newPhone.brand);
    };

    this.uploader.uploadAll();
  }
}
