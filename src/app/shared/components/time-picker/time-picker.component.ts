import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbTimepicker, NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent  implements OnInit, AfterViewInit{
  form!:FormGroup;
  time = {hour: 0, minute: 0};
  time2 = {hour: 0, minute: 0};
  msgError:string='';

  @ViewChild(NgbTimepicker) picker!:NgbTimepicker; //enlace al picker de la vista
  @ViewChild('texto') texto!:ElementRef;

  constructor(config: NgbTimepickerConfig, private fb:FormBuilder){
    config.spinners=false;
    config.meridian=true;
  }
 
  ngOnInit(): void {
    this.form= this.createForm();    
  }

  ngAfterViewInit(): void {
    // console.log('picker:',this.picker);
    // console.log('texto:',this.texto);
  }

  createForm(){
    return this.fb.group({
      picker:[this.time,Validators.compose(
        [ 
          Validators.required,
        ])]
    });
  
    

  }

  submit(){
    const a=this.form.controls['picker'].value;
    console.log('picker:',this.picker);
  }

  lokura(picker:NgbTimepicker){
    // let h: any[]=[];
    // h=[ ...h, picker.model?.hour];
    console.log('picker time->',picker.model);
    // console.log('picker hour->',picker.model?.hour);
    //console.log(h);
    
  }
  

  write(){
    let a: number[]= [];
    let n = Number(this.texto.nativeElement.value);
    a=[...a,n];     
    if (a[0]>24) {
      console.log('mayor q 24');  
    }else{  
      console.log(a);
    }
    
    
  }
}
