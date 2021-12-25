import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Data } from './data';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SerService {

  constructor(private http:HttpClient) { }

  login(username:string,password:string):Observable<Data>{
    console.log(username+" "+password)
    var params=new HttpParams({
      fromObject:{
        name:username,
        password:password
      }
    })
    var header=new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post<Data>('http://localhost:3000/login',params,{headers:header});
  }
  add(file:File,userid:string):Observable<Data>{
    console.log('add performed')
    var formdata:FormData=new FormData();
    
    console.log(userid);
    formdata.append('file',file);
    
    var header=new HttpHeaders();
    header.append('Content-Type', 'multipart/form-data');
    header.append('Accept', 'application/json');
    return this.http.post<Data>('http://localhost:3000/add',formdata,{params:{'userid':userid}});
  }

  signin(name:string,password:string):Observable<Data>{
    var params=new HttpParams({
      fromObject:{
        name:name,
        password:password
      }
    })
    var header=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.post<Data>('http://localhost:3000/signin',params,{headers:header});
  }

  delete(link:string):Observable<Data>{
    var params=new HttpParams({
      fromObject:{
        link:link
      }
    })
    var header=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.post<Data>('http://localhost:3000/delete',params,{headers:header});
  }

  all(userid:string){
    var params=new HttpParams({
      fromObject:{
        userid:userid
      }
    })
    var header=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    return this.http.post<Data>('http://localhost:3000/images',params,{headers:header});
  }
  
}
