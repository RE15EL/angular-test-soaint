import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm= this.fb.group({
    name:['', [Validators.required, Validators.minLength(3)]],
    email:['', [Validators.required,Validators.email] ],
  });

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {

  }

  onSubmit():void{
    console.log('valores', this.registerForm.value);    
  }

}
