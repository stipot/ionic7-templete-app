import { UserService } from './../user.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Component_Item {
  c_name: string
  c_desc: string
  link: string
}
@Component({
  selector: 'app-front-layout',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.scss'],
})
export class FrontLayoutComponent implements OnInit {
  public Front!: string;
  private activatedRoute = inject(ActivatedRoute);
  comp_list: Component_Item[] = [
    {c_name: "Входящие", c_desc: "inbox",link:"/folder/inbox" }, 
    {c_name: "Intro", c_desc: "мы хотим помочь вам создавать более качественные и быстрые приложения Ionic",link:"/intro"},
    {c_name: "Profile", c_desc: "Профиль?",link:"/profil"},
    {c_name: "User", c_desc: "Бочкова Диана Ашотовна",link:"/user"}, 
    {c_name: "Settings", c_desc: "Настройки шрифта",link:"/settings"},
    {c_name: "contact card", c_desc: "Александр Сергеевич Пушкин",link:"/contact-card"},
    {c_name: "Пометки", c_desc: "сохранять текст",link:"/notes"},
    {c_name: "Login", c_desc: "Данный компонент разработан для прохождения авторизации",link:"/login"},
    {c_name: "Sign up", c_desc: "Помимо стандартной процедуры регистрации пользователю предоставлена возможность провести регистрацию через социальные сети.",link:"/signup"},
    {c_name: "Terms of service", c_desc: "AGREEMENT TO TERMS, INTELLECTUAL PROPERTY RIGHTS",link:"/terms-of-service"},
    {c_name: "policy-privacy", c_desc: "Политика конфиденциальности ",link:"/privacy-policy"},
    {c_name: "Deals", c_desc: "Новости, Акции",link:"/deals"},
    {c_name: "Recipes", c_desc: "Рецепты",link:"/recipes"}, 
    {c_name: "Owerview", c_desc: "Обзоры",link:"/owerview"}, 
    {c_name: "Fashion", c_desc: "Меню",link:"/fashion"}, 
    {c_name: "Forgot Password", c_desc: "Please, enter your email and we'll send you an email to reset your password",link:"/forgot-password"}, 
    {c_name: "RSS Data", c_desc: "Данный компонент разработан для получения и отображения данных ленты RSS в приложении Angular. Он обеспечивает корректное получение и разбор элементов ленты RSS для отображения.",link:"/rss-data"}, 
    {c_name: "Список дел", c_desc: "Компонент нужен для записи задач",link:"/todo-list"}, 
    {c_name: "Forms", c_desc: "Этот компонент разрабатывается для проверки данных пользователя",link:"/forms"}, 
    {c_name: "Filters", c_desc: "Этот компонент поможет разработчикам легко реализовать фильтры поиска в своих приложениях",link:"/filters"}, 
    {c_name: "Validations", c_desc: "Этот компонент разрабатывается для проверки данных пользователя",link:"/validations"}, 
    {c_name: "QR-сканер", c_desc: "Barcode Scanner",link:"/barcode-scanner"}, 

  ]
  
  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.Front = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
