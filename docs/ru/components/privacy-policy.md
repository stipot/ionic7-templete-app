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