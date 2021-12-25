import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../data';
import { SerService } from '../ser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username="";
  password=""
  constructor(private serve:SerService,private router:Router) { }

  message={};
  
  login(){
    //console.log(this.serve.login(this.username,this.password));
    //alert(this.username+" "+this.password)
    this.serve.login(this.username,this.password)
        .subscribe(data => {
          if(data.status=='Success'){
            //alert("Success");
            this.router.navigateByUrl('/allimages');
            sessionStorage.setItem('username',this.username);
            sessionStorage.setItem('password',this.password);
            sessionStorage.setItem('userid',data.extra);
            console.log(data)
          }else if(data.status=='Error'){
            alert("Server side error occured");
          }else if(data.status=='Invalid'){
            alert('Invalid username or password');
          }
        })
  }
  ngOnInit(): void {
    if(sessionStorage.getItem('username')!=null&&sessionStorage.getItem('password')!=null){
      this.router.navigateByUrl('/allimages');
    }
    
  }

}
