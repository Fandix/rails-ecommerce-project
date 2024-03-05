import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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


  async onComfirmClicked() {
    const user = this.formGroup.value;
    try {
      const response = await axios.post('http://localhost:3000/signup', { user });
      if (response.status === 200) {
        this._snackBar.open('Signup Successful.');
        this._router.navigate(['/login']);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
