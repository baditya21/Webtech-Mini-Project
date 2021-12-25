import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerService } from '../ser.service';

@Component({
  selector: 'app-deleteimage',
  templateUrl: './deleteimage.component.html',
  styleUrls: ['./deleteimage.component.css']
})
export class DeleteimageComponent implements OnInit {

  link=''
  constructor(private serv:SerService,private router:Router) { }

  delete(){
    this.serv.delete(this.link)
        .subscribe(data=>{
          if(data.status=='Success'){
            alert('Image deleted successfuly');
          }else if(data.status=='Invalid'){
            alert('Invalid link');
          }else{
            alert('Server side error occured')
          }
        })
  }
  ngOnInit(): void {
    if(sessionStorage.getItem('userid')==null){
      this.router.navigateByUrl('/login');
    }
  }

}
