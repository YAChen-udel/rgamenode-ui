import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private path='http://localhost:3000/api/security';
	private _token:string=null;
	CurrentUserID: ReplaySubject<string>=new ReplaySubject<string>();
	CurrentUserUsername: ReplaySubject<string>=new ReplaySubject<string>();
	CurrentUserEmail: ReplaySubject<string>=new ReplaySubject<string>();

	get token():string{
		if (this._token==null){
			this._token=localStorage.getItem('token')
		}
		return this._token;
	}

	set token(val:string){
		this._token=val;
		if (val==null)
		localStorage.removeItem('token');
		else
		localStorage.setItem('token',val);
	}

	get loggedIn():boolean{
		return this.token!=null;
	}

	constructor(private http:HttpClient) {
		this.CurrentUserID.next(null);
		this.CurrentUserUsername.next(null);
		this.CurrentUserEmail.next(null);
	}

	public getUser(userID: string){
		return this.http.get(`${this.path}/public/${userID}`);
	}

	//authorize calls the underlying api to see if the current token is valid (if it exists) and clears it if it is not.
	//returns nothing, but updates token if it is invalid
	authorize():void{
		this.http.get(this.path+'/authorize').subscribe(result=>{
			//on success, we do nothing because token is good
			if (result['status']!='success'){
				this.token=null;
			}
			else{
				this.CurrentUserID.next(result['data'].userID);
				this.CurrentUserUsername.next(result['data'].username);
				this.CurrentUserEmail.next(result['data'].email);
			}

		},err=>{
			this.token=null;
		});
	}

	register(username:string, email:string, password:string):Observable<any>{
		return this.http.post<any>(this.path+'/register',{
			username:username,
			email: email,
			password:password}).pipe(map(result=>{
				if (result['status']!='success'){
					return this.login(username, password);
				}
			}),catchError(err=>{
				this.CurrentUserID.next(null);
				this.CurrentUserUsername.next(null);
				this.CurrentUserEmail.next(null);
				this.token=null;
				return throwError(err.message||'server error')}));
			}

	login(login:string, password:string):Observable<any>{
		return this.http.post<any>(this.path+'/login',{login: login,password: password })
		.pipe(map(user=>{
			this.token=user.data.token
			this.CurrentUserID.next(user.data.userID);
			this.CurrentUserUsername.next(user.data.user.uername);
			this.CurrentUserEmail.next(user.data.user.email);
			return user.data.user;
		}),catchError(err=>{
			this.CurrentUserID.next(null);
			this.CurrentUserUsername.next(null);
			this.CurrentUserEmail.next(null);
			this.token=null;
			return throwError(err.message||'server error')}));
		}

		logout(){
			this.token=null;
			this.CurrentUserID.next(null);
			this.CurrentUserUsername.next(null);
			this.CurrentUserEmail.next(null);
		}
}
