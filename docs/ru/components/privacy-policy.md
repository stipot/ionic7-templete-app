# Компонент политика конфединциальности 
## Использование 
1. содержание политики конфиденциальности можно отредактировать в файле privacy-policy.component.html 
2. для того чтобы открыть файл нужно использовать следующий код

```app.component.html
<ion-button slot="end" (click)="show()">Открыть</ion-button>

```
...app components.ts
```typescript
import { ModalController } from '@ionic/angular';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

// Ваш код
constructor(private modalCtrl: ModalController) { }

async show() {
    const modal = await this.modalCtrl.create({
      component: PrivacyPolicyComponent
    });
    modal.present();
  }
```
...
компонени privacy-policy

внесены изменения в код для отладки модального окна privacy-policy.
Ваш код 

код относится к privacy-policy.component
код вставляется в 3 строку 
import { PrivacyPolicyComponent } from './privacy-policy.component';

следующий код относится к компоненту privacy-policy.component.ts
код вставляется в 14 строку компонента 
constructor(private modalCtrl: ModalController) { }

signup 
signup.component.ts
код вставляется в строки с 28-39
```
 appTitle = "Ionic 7 Template App"
  constructor (public modalController: ModalController){}
  ngOnInit() { }

  async show() {
      const modal = await this.modalController.create({
      component: PrivacyPolicyComponent
    });
    modal.present(); 
    const {data, role} = await modal.onWillDismiss(); 
  }
}
```
app.component.html
код вставляется в 8 строку компонента
<ion-button (click)="showDLG()"></ion-button>

app.component.ts
код вставляется в 27 строку кода
constructor (public modalController: ModalController){} 

код вставляется в строки в 30-34
```
async showDLG() {
      const modal = await this.modalController.create({
      component: PrivacyPolicyComponent
    });
    modal.present(); 
```
