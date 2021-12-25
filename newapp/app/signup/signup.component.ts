import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerService } from '../ser.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name='';
  password=''
  constructor(private serv:SerService,private router:Router) { }

  signin(){
    this.serv.signin(this.name,this.password)
        .subscribe(data=>{
          if(data.status=='Success'){
            this.router.navigateByUrl('/login');
          }else if(data.status=='Error'){
            alert('Server side error occured')
          }else if(data.status=='Match'){
            alert('User already exists');
          }
        })
  }
  
  ngOnInit(): void {
  }

}
