import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerService } from '../ser.service';

@Component({
  selector: 'app-allimages',
  templateUrl: './allimages.component.html',
  styleUrls: ['./allimages.component.css']
})
export class AllimagesComponent implements OnInit {

  constructor(private serv:SerService,private router:Router) { }

  userid:string='';
images:Array<any>=[];
copylink(link:any){
  navigator.clipboard.writeText('http://localhost:3000/image/'+link);
}
  ngOnInit(): void {
    if(sessionStorage.getItem('userid')==null){
      this.router.navigateByUrl('/login');
    }
    this.userid=sessionStorage.getItem('userid')!!;
    this.serv.all(this.userid)
        .subscribe(data=>{
          if(data.status=='Error'){
            alert('Server side error occured')
          }else{
            for(let i in data.extra){
              this.images.push(data.extra[i]._id);
            }
          }
          
        })
  }

// images=[1,2,3,4,5,6,11,12,13,14]
}
