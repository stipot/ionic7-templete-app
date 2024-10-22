import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  profile = {
    "userImage": "/",
    "name": "?",
    "job": "|",
    "membership": "!",
    "likes": "#",
    "followers": "a",
    "following": "b",
    "about": "c",
    "friends": "d"

  }
}
