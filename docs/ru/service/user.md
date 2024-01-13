# Firestore

Для полноценной работы приложения нужен Google Firestore. В нем должны быть установлены подобные правила:

```
    rules_version = '2';

    service cloud.firestore {
    match /databases/{database}/documents {
        match /{document=**} {
        allow read, write, delete, update: if true;
        }
    }
    }
```

В данной версии т.к. нет локального хранилища идентификатора пользователя в коде установлен свой идентификатор.

```typescript
private readonly ID = "qGgoKvgwaNBLU2ooS4eP"
```

Схема хранения данных:

    Название коллекции -> ID пользователя -> Данные пользователя

Пример:

```typescript
todo-list -> qGgoKvgwaNBLU2ooS4eP -> {data:
        items: {
            name: "1",
            desc: ""
        },{
            name: "2",
            desc: ""
        }}
```

ToDo:
- Необходимо избавится от статического идентификатора в user.service.ts
- Продумать структуру методов