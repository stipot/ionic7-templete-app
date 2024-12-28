# Contact Card Component
> Contact Card Component is a personal profile, like in social networks. It contains information about the profile owner and his avatar.
To see this page you need to follow the link: "http://localhost:8100/contact-card"

## Used data
The data used is in "assets/sample-data/contact-card.json".
The model is in "src/app/contact-card/contact-card.service/contact-card.model.ts"
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