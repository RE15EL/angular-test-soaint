import { Directive, ElementRef, HostListener } from '@angular/core';
import { AbstractControl, ValidatorFn } from "@angular/forms";


@Directive({
  selector: '[hoursValidation]'
})

// export function hoursValidation():ValidatorFn{
//   return (control:AbstractControl)=>{
//     const directiva = new HoursDirectiveDirective();
//     return directiva.onChangeHour(control);
//   }
// }

export class HoursDirectiveDirective {

  constructor( private readonly elRef:ElementRef) { }

  @HostListener('input', ['$event'])

  onChangeHour(event:Event):void{
    const numberOnly= /[^0-9]+/g;
    const initValue= this.elRef.nativeElement.value; 
    this.elRef.nativeElement.value= initValue.replace(numberOnly,'');
    if (initValue !== this.elRef.nativeElement.value) {
      event.stopPropagation();
    }
    // console.log( this.elRef.nativeElement.value);
  }
}
