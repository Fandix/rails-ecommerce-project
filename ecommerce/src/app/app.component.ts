import { Component } from '@angular/core';
import { Router } from "@angular/router"
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _router: Router, private _snackBar: MatSnackBar) {}
  title = 'ecommerce';

  onLoginClicked() {
    this._router.navigate(['/login']);
  }

  async onLogoutClicked() {
    const jwt = localStorage.getItem('JWT');
    if (jwt) {
      try {
        const response = await axios.delete('http://localhost:3000/logout', {
          headers: { Authorization: jwt }
        });

        if (response.status === 200) {
          localStorage.removeItem("JWT");
          this._snackBar.open('Logout Successful.')
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem('JWT');
        this._router.navigate(['/login']);
      }
    }
  }
}
