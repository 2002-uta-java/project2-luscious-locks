import { Comment } from './../components/homepage/comment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  /*~~~~~Base URL, Basic Auth, and methods for every endpoint~~~~~*/

  //Base URL for any endpoint.

  baseUrl: string = 'http://ec2-18-224-6-156.us-east-2.compute.amazonaws.com:8090/Proj2-0.0.1-SNAPSHOT';

  //Basic Authorization, will be replaced with user token when logged in.
  basicAuth: string = 'YnJpYW46d2hhdGV2';

  //Method to get all users, using Basic Auth
  public getUsers(auth){
    return this.httpClient.get(this.baseUrl+'/users',{ headers: new HttpHeaders().set('Authorization', `Basic ${auth}`)});
  }

  //Method to get all comment
  public getComments(auth){
    return this.httpClient.get(this.baseUrl+'/comments',{ headers: new HttpHeaders().set('Authorization', `Basic ${auth}`)});
  }

  //Log a user in based on provided credentials, returns 401 if user doesn't exist
  public loginUser(username:string, password:string){
    let data = {'username': username, 'password': password};
    const headers = new HttpHeaders ({'Content-Type': 'application/json'});
    return this.httpClient.post(this.baseUrl+'/login', JSON.stringify(data), {headers: headers});
  }

  //Post request to persist user given credentials, sign up
  public signUpUser(username:string, password:string){
    let data = {'username': username, 'password': password};
    const headers = new HttpHeaders ({'Content-Type': 'application/json'});
    return this.httpClient.post(this.baseUrl+'/users', JSON.stringify(data), {headers: headers});
  }

    //Post request to persist an image given url and description
    public postImageDB(url:string, description:string, auth:string){
      let data = {'url': url, 'description': description};
      const headers = new HttpHeaders ({'Content-Type': 'application/json'});
      return this.httpClient.post(this.baseUrl+'/images', JSON.stringify(data), {headers: headers.append('Authorization', `Basic ${auth}`)});
    }

    //Delete image from the DB
    public deleteImageDB(id:number, auth:string){
      return this.httpClient.delete(this.baseUrl+`/images/${id}`,{headers: new HttpHeaders().set('Authorization', `Basic ${auth}`)});
    }

    //Method to get all images of a user
    public getUserImagesByID(id:number, auth:string){
      return this.httpClient.get(this.baseUrl+`/users/${id}/images`,{ headers: new HttpHeaders().set('Authorization', `Basic ${auth}`)});
    }
    
    //Method to get all images by all users
    public getUserImages(auth:string){
      return this.httpClient.get(this.baseUrl+`/images`,{headers: new HttpHeaders().set('Authorization', `Basic ${auth}`)});
    }

    //Method to get rating by id
    public getRatingByID(id:number, auth:string){
      return this.httpClient.get(this.baseUrl+`/ratings/${id}`,{ headers: new HttpHeaders().set('Authorization', `Basic ${auth}`)});
    }

    //Method to post comment on image
    public postCommentOnImage(id:number, comment:Comment, auth:string){
      const headers = new HttpHeaders ({'Content-Type': 'application/json'});
      return this.httpClient.post(this.baseUrl+`/images/${id}/comments`,JSON.stringify(comment), {headers: headers.append('Authorization', `Basic ${auth}`)});
    }

    //Method to get all comments by of an image by id
    public getCommentsOfImage(id:number, auth:string){
      return this.httpClient.get(this.baseUrl+`/images/${id}/comments`,{ headers: new HttpHeaders().set('Authorization', `Basic ${auth}`)});
    }    

    //Method to get all ratings by an image by id
    public getRatingOfImage(id:number, auth:string){
      const headers = new HttpHeaders ({'Content-Type': 'application/json'});
      return this.httpClient.get(this.baseUrl+`/images/${id}/ratings`,{params: new HttpParams().set('all', 'true') ,
        headers: headers.append('Authorization', `Basic ${auth}`)});
    }

    //Method to post rating on image
    public postRatingOnImage(id:number, rating:string, auth:string){
      let data = {'rating': rating};
      const headers = new HttpHeaders ({'Content-Type': 'application/json'});
      return this.httpClient.post(this.baseUrl+`/images/${id}/ratings`,JSON.stringify(data), {headers: headers.append('Authorization', `Basic ${auth}`)});
    }

    //Method to put flag on image
    public putFlagOnImage(id:number, status:boolean, auth:string){
      let data = {'flagged': status};
      const headers = new HttpHeaders ({'Content-Type': 'application/json'});
      return this.httpClient.put(this.baseUrl+`/images/${id}`,JSON.stringify(data), {headers: headers.append('Authorization', `Basic ${auth}`)});
    }

    //Method to put flag on comment
    public putFlagOnComment(id:number, status:boolean, auth:string){
      let data = {'rating': status};
      const headers = new HttpHeaders ({'Content-Type': 'application/json'});
      return this.httpClient.put(this.baseUrl+`/comments/${id}`,JSON.stringify(data), {headers: headers.append('Authorization', `Basic ${auth}`)});
    }

    //Method to put resolution on image, accepted = true/false
    public putReviewOnImage(id:number, status:boolean, auth:string){
      let data = {'accepted': status};
      const headers = new HttpHeaders ({'Content-Type': 'application/json'});
      return this.httpClient.post(this.baseUrl+`/images/${id}`,JSON.stringify(data), {headers: headers.append('Authorization', `Basic ${auth}`)});
    }

    //Method to get delete comment
    public deleteComment(id:number, auth:string){
      return this.httpClient.delete(this.baseUrl+`/comments/${id}`,{ headers: new HttpHeaders().set('Authorization', `Basic ${auth}`)});
    }

    //Method to put ban on user
    public putBanOnUser(id:number, status:boolean, auth:string){
      let data = {'banned': status};
      const headers = new HttpHeaders ({'Content-Type': 'application/json'});
      return this.httpClient.put(this.baseUrl+`/users/${id}`,JSON.stringify(data), {headers: headers.append('Authorization', `Basic ${auth}`)});
    }

    //Method to post warning on user
    public putWarningOnUSer(id:number, warning:string, auth:string){
      let data = {'warning': warning};
      const headers = new HttpHeaders ({'Content-Type': 'application/json'});
      return this.httpClient.put(this.baseUrl+`/users/${id}`,JSON.stringify(data), {headers: headers.append('Authorization', `Basic ${auth}`)});
    }

     //Method to post rating on image
     public putMutedOnUSer(id:number, status:boolean, auth:string){
      let data = {'muted': status};
      const headers = new HttpHeaders ({'Content-Type': 'application/json'});
      return this.httpClient.put(this.baseUrl+`/users/${id}`,JSON.stringify(data), {headers: headers.append('Authorization', `Basic ${auth}`)});
    }    

    public putLoginOnUser(id: number, username: string, password: string, auth: string) {
      let data = {'username': username, 'password': password};
      const headers = new HttpHeaders ({'Content-Type': 'application/json'});
      return this.httpClient.put(this.baseUrl+`/users/${id}`,JSON.stringify(data), {headers: headers.append('Authorization', `Basic ${auth}`)});
    }

  /*~~~~~URLs, Access Token, Client ID, and method to interact with imgur API~~~~~*/

  apiPostUrl: string = 'https://api.imgur.com/3/upload';

  apiGetUrl: string = 'https://api.imgur.com/3/account/me/images';

  apiImageUrl: string = 'https://api.imgur.com/3/image';

  // Bearer token used when authorizing access to an imgur account (ie. getImages(), postImages(), deleteImage())
  accessToken: string = '17f9f5c7c047c939dfefaed4d541bf2c1a23fde4';

  // Client-ID token used for anonymous access (ie. getImage())
  clientId: string = '546c25a59c58ad7';

  public getImages(){
    return this.httpClient.get(this.apiGetUrl,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`)});
  }

  public getImage(imageId){
    return this.httpClient.get(`${this.apiImageUrl}/${imageId}`,{ headers: new HttpHeaders().set('Authorization', `Client-ID ${this.clientId}`)});
  }
  
  // need image parameter, others are optional; returns 200 on success :)
  public postImage(image, type='file', description='',  name='', title='', ){
    const formData = new FormData();
    formData.append('image', image);
    formData.append('type', type);
    formData.append('description', description);
    formData.append('name', name);
    formData.append('title', title);
    return this.httpClient.post(this.apiImageUrl, formData, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`)});
  }

  public deleteImage(imageId){
    return this.httpClient.delete(`${this.apiImageUrl}/${imageId}`,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`)});
  }
}
