import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm= this.fb.group({
    email:['', [Validators.email, Validators.required]]
  });

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {

  }

  onSubmit():void{
    console.log('valores', this.loginForm.value);     
  }

}
