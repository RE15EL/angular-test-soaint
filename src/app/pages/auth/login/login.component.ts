import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../../users/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm= this.fb.group({
    email:['', [Validators.email, Validators.required]],
    pass:['', [Validators.minLength(5), Validators.required]],

  });

  constructor(private fb:FormBuilder , public authSvc:AuthService, private router:Router) { }

  ngOnInit(): void {

  }

  onSubmit():void{
    // console.log('valores', this.loginForm.value);  
    const user:User= {
      email:String(this.loginForm.value.email),
      pass:String(this.loginForm.value.pass),
      name:'',
      roles:['read']
    };
    this.authSvc.login( user);
  }

}
