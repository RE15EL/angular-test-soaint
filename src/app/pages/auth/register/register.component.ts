import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../../users/interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm= this.fb.group({
    name:['', [Validators.required, Validators.minLength(3)]],
    pass:['', [Validators.required,Validators.minLength(5)] ],
    email:['', [Validators.required,Validators.email] ],
  });

  constructor(private fb:FormBuilder, private authSvc:AuthService) { }

  ngOnInit(): void {

  }

  onSubmit():void{
    // console.log('user->', this.registerForm.value);  
    const user:User= {
      name: String(this.registerForm.value.name),
      email:String(this.registerForm.value.email),
      pass:String(this.registerForm.value.pass),
      roles:['read']
    };
    this.authSvc.register(user)
      .pipe()
      .subscribe( res => console.log(res));
  }

}
