import { UserService } from './../user.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
  pageTitle = "FrontPage"
  private activatedRoute = inject(ActivatedRoute);
  comp_list: Component_Item[] = [
    { c_name: "Settings", c_desc: "Компонент разработан для того, чтобы пользователи могли контролировать поведение приложения, управлять им по своим предпочтения", link: "/settings" },
    { c_name: "Intro", c_desc: "Компонент поможет вам создавать более качественные и быстрые приложения Ionic", link: "/intro" },
    { c_name: "Terms of service", c_desc: "Компонент разработан для прохождения условий использования в приложении Angular", link: "/terms-of-service" },
    { c_name: "policy-privacy", c_desc: "Компонент политика конфединциальности ", link: "/privacy-policy" },
    { c_name: "Sign up", c_desc: "Компанент стандартной процедуры регистрации пользователю предоставлена возможность провести регистрацию через социальные сети.", link: "/signup" },
    { c_name: "Login", c_desc: "Компонент разработан для прохождения авторизации в приложени Angular", link: "/login" },
    { c_name: "Forgot Password", c_desc: "Компонент разрабатывался для восстановления пароля пользователем. Проверяется на корректность введения электронной почты пользователем.", link: "/forgot-password" },
    { c_name: "User", c_desc: "Компанент управление пользователем", link: "/user" },
    { c_name: "contact card", c_desc: "Компонент Контактная Карта представляет собой личный профиль, как в социальных сетях.", link: "/contact-card" },
    { c_name: "Рецепты", c_desc: "Компонент разработан для отображения и взаимодействия с рецептами в приложении Angular.", link: "/recipes" },
    { c_name: "Shopping", c_desc: "Компонент Shopping предоставляет пользователям информацию о списке товаров", link: "/shopping" },
    { c_name: "cryptorates", c_desc: "Компонент CryptoRates предоставляет пользователям актуальную информацию о ценах на популярные криптовалюты.", link: "/cryptorates" },
    { c_name: "Новости", c_desc: "Компонент разработан для получения и отображения данных из RSS-ленты в приложении Angular.", link: "/rss-data" },
    { c_name: "Заметки", c_desc: "Компонент нужен для записи важных вещей чтобы не забыть.", link: "/notes" },
    { c_name: "Список дел", c_desc: "Компонент нужен для записи задач", link: "/todo-list" },
    { c_name: "VideoPlayer", c_desc: "Компонент предназначенный для воспроизведения файлов мультимедиа-содержимого.", link: "/videoplayer" },
    { c_name: "Фильтры", c_desc: "Компонент поможет разработчикам легко реализовать фильтры поиска в своих приложениях", link: "/filters" },
    { c_name: "Подтверждения", c_desc: "Компонент разрабатывается для проверки данных пользователя", link: "/validations" },
    { c_name: "Сканер штрих-кодов", c_desc: "Компонент разрабатывается для проверки данных пользователя.", link: "/barcode-scanner" },
    { c_name: "scilink", c_desc: "Компонент позволяет пользователю вводить текст для поиска научных статей.", link: "/scilink" },
    { c_name: "Kanban-доска", c_desc: "Kanban-доска с возможностью перетаскивать задачи между столбцами.", link: "/kanban" },
    { c_name: "Drag and drop", c_desc: "Drag and drop feature example", link: "/drag-and-drop" },
    { c_name: "Water Trackerr", c_desc: "water trackerr", link: "/water-tracker" },
  ]

  constructor(private userService: UserService, private translate: TranslateService) {

  }

  ngOnInit() {
    this.Front = this.activatedRoute.snapshot.paramMap.get('id') as string;
    // Component name
    this.translate.get('FrontPage').subscribe((translated: string) => {
      this.pageTitle = translated;
    });
  }
}
