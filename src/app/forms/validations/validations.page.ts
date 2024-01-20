import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-validations',
  templateUrl: './validations.page.html',
  styleUrls: ['./validations.page.scss'],
})
export class ValidationsPage implements OnInit {

  validations = {
    'username': [
      {message: 'Username is required.' },
    ],
    'name': [
      {message: 'Name is required.' }
    ],
    'lastname': [
      {message: 'Last name is required.' }
    ],
    'email': [
      {message: 'Enter a valid email.' }
    ],
    'phone': [
      {message: 'Phone is required.' },
    ],
    'password': [
      {message: 'Password is required.' },
    ],
    'confirm_password': [
      { message: 'Password confirmation is required.' }
    ],
    'matching_passwords': [
      { message: 'Password mismatch' }
    ],
      'terms': [
        {message: 'You must accept terms and conditions.' }
      ],
      'data': [
        {message: 'Data is required.'}
      ]
    
  };

  genders = [
    'Female',
    'Male',
    'Other'
  ];
  countrie = [
    'Russia',
    'Kazahstan',
    'Poland'
  ];
 
  constructor() { 
    

  }
  
  ngOnInit() {

  


    
  }

}
