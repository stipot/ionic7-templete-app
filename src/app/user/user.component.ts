import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  userProfile = {
    "userImage": "src/assets/sample-images/notifications/diana.jpg",
    "name": "Бочкова Диана Ашотовна",
    "membership": "ПРО",
    "job": "Программист-консультант, внедренец",
    "likes": "1448",
    "followers": "666K",
    "following": "666",
    "about": "Всем привет! Меня зовут Дианчик, я люблю работать и люблю всех вас!",
    "friends": "Друзья",
    "frnd1": "Майкл",
    "frnd2": "Тревор",
    "frnd3": "Франклин"
}

}
