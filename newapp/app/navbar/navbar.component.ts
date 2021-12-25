import { DOCUMENT } from '@angular/common';
import { viewClassName } from '@angular/compiler';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  @ViewChild('all', { static: true }) all!: ElementRef;
  @ViewChild('add',{static:true}) add!:ElementRef;
  @ViewChild('delete',{static:true}) delete!:ElementRef; 

  path=''
  logout(){
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('password')
    sessionStorage.removeItem('userid');
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('userid')==null){
      this.router.navigateByUrl('/login');
    }
    this.path=window.location.pathname;
    if(this.path=='/addimage'){
      //add
      this.add.nativeElement.className='nav-item active';
      this.all.nativeElement.className='nav-item';
      this.delete.nativeElement.className='nav-item';
    }else if(this.path=='/deleteimage'){
      //delete
      this.add.nativeElement.className='nav-item';
      this.all.nativeElement.className='nav-item';
      this.delete.nativeElement.className='nav-item active';
    }else if(this.path=='/allimages'){
      //all
      this.add.nativeElement.className='nav-item';
      this.all.nativeElement.className='nav-item active';
      this.delete.nativeElement.className='nav-item';
    }
  }

}


