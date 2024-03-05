import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from "@angular/router"
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private _fb: FormBuilder, private _router: Router, private _snackBar: MatSnackBar) {
    this.formGroup = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  async submit() {
    const user = this.formGroup.value;
    try {
      const response = await axios.post('http://localhost:3000/login', { user });
      if (response.headers["authorization"]) {
        localStorage.setItem("JWT", response.headers["authorization"]);
        this._snackBar.open('Login Successful.');
        this._router.navigate(['/']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  onSignupClicked() {
    this._router.navigate(['/signup'])
  }
}
