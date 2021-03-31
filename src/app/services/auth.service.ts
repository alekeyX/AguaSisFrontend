import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
      let user = (JSON.parse(localStorage.getItem('currentUser')));
      this.currentUserSubject = new BehaviorSubject<any>(user);
      this.currentUser = this.currentUserSubject.asObservable();
    }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string){
    return this.http.post<any>(environment.apiUrl + '/login', {username, password})
      .pipe(map(user => {
        // iniciar sesión correctamente si hay un token en la respuesta
        if (user && user.data.token) {
          
          // almacenar detalles de usuario y token en local storage para mantener
          // al usuario conectado entre actualizaciones de página
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}
