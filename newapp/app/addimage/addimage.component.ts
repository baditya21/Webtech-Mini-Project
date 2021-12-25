import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerService } from '../ser.service';


@Component({
  selector: 'app-addimage',
  templateUrl: './addimage.component.html',
  styleUrls: ['./addimage.component.css']
})
export class AddimageComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  userid='';
  progress = 0;
  message = '';

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  constructor(private serv:SerService,private router:Router) { }
link='';
add(){

  if (this.selectedFiles) {
    const file: File | null = this.selectedFiles.item(0);
    if (file) {
      this.currentFile = file;
      this.userid = sessionStorage.getItem('userid')!!.toString();


  this.serv.add(this.currentFile,this.userid)
      .subscribe(data =>{
        console.log(data);
        if(data.status=='Error'){
          alert('Server side error occured')
        }else if(data.status=='file'){
          alert('file format not supported')
        }else{
          this.link=data.extra;
        }
        
        
      })
}}}
  ngOnInit(): void {
    if(sessionStorage.getItem('userid')==null){
      this.router.navigateByUrl('/login');
    }
  }

}
