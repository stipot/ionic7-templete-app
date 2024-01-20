import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent  implements OnInit {

  ionicForm!: FormGroup;

  
  constructor(public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.ionicForm=this.formBuilder.group({
      email: ['',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
      ]]
    })
  }
  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm = () => {
    if (this.ionicForm.valid) {
      console.log(this.ionicForm.value);
      return false;
    } else {
      return console.log('Please provide all the required values!');
    }
  };
}
