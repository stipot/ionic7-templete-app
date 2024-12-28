import { UserService } from './../user.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Component_Item {
  c_name: string
  c_desc: string
}
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  comp_list: Component_Item[] = [
    {c_name: "Входящие", c_desc: "inbox"}, 
    {c_name: "Intro", c_desc: "мы хотим помочь вам создавать более качественные и быстрые приложения Ionic"},
    {c_name: "Profile", c_desc: "Профиль?"},
    {c_name: "User", c_desc: "Бочкова Диана Ашотовна"}, 
    {c_name: "Settings", c_desc: "Настройки шрифта"},
    {c_name: "contact card", c_desc: "Александр Сергеевич Пушкин"},
    {c_name: "Пометки", c_desc: "сохранять текст"},
    {c_name: "Login", c_desc: "Данный компонент разработан для прохождения авторизации"},
    {c_name: "Sign up", c_desc: "Помимо стандартной процедуры регистрации пользователю предоставлена возможность провести регистрацию через социальные сети."},
    {c_name: "Terms of service", c_desc: "AGREEMENT TO TERMS, INTELLECTUAL PROPERTY RIGHTS"},
    {c_name: "policy-privacy", c_desc: "Политика конфиденциальности "},
    {c_name: "Deals", c_desc: "Новости, Акции"},
    {c_name: "Recipes", c_desc: "Рецепты"}, 
    {c_name: "Fashion", c_desc: "Меню"}, 
    {c_name: "Forgot Password", c_desc: "Please, enter your email and we'll send you an email to reset your password"}, 
    {c_name: "RSS Data", c_desc: "Данный компонент разработан для получения и отображения данных ленты RSS в приложении Angular. Он обеспечивает корректное получение и разбор элементов ленты RSS для отображения."}, 
    {c_name: "Список дел", c_desc: "Компонент нужен для записи задач"}, 
    {c_name: "Forms", c_desc: "Этот компонент разрабатывается для проверки данных пользователя"}, 
    {c_name: "Filters", c_desc: "Этот компонент поможет разработчикам легко реализовать фильтры поиска в своих приложениях"}, 
    {c_name: "Validations", c_desc: "Этот компонент разрабатывается для проверки данных пользователя"}, 
    {c_name: "QR-сканер", c_desc: "Barcode Scanner"},
    {c_name: "Kanban", c_desc: "Kanban-доска с возможностью перетаскивать задачи между столбцами."},

  ]
  // При помощи конструктора вызываем метод из user.services и выводим данные в консоль
  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
