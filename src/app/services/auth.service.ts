import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Credenciais } from '../models/credenciais';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) { }

  authenticate(creds: Credenciais){
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe : 'response',
      responseType : 'text'
    });
  }

  sucessfulLogin(authToken: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', authToken);
    }
  }

  isAuthenticated(): boolean {
    let token: string | null = null;
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token');
    }
    if (token != null) {
      return true;
    }
    else {
      return false;
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}
