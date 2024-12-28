# Компонент Контактная карта
> Компонент Контактная Карта представляет собой личный профиль, как в социальных сетях. На ней представленны данные о владельце профиля и его аватар.
Чтобы увидеть данную страничку нужно перейти по ссылке: "http://localhost:8100/contact-card"

## Используемые данные
Используемые данные находятся в "assets/sample-data/contact-card.json".
Модель находится в "src/app/contact-card/contact-card.service/contact-card.model.ts"
```
export interface ContactCard{
    name?: string
    nickname?: string
    followers?: number
    following?: number
    status?: string
    bday?: string
    address?: string
    marriage?: string
    alife?: boolean
  }
```