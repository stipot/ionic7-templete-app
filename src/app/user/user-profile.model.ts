

export class UserProfileModel extends ShellModel {
    userImage: string;
    name: string;
    membership: string;
    job: string;
    likes: string;
    followers: string;
    following: string;
    about: string;
    friends: Array<{image: string, name: string}> = [
      {
        image: '',
        name: ''
      },
      {
        image: '',
        name: ''
      },
      {
        image: '',
        name: ''
      },
      {
        image: '',
        name: ''
      }
    ];
    photos: Array<string> = [
      '',
      '',
      '',
      ''
    ];
  
    constructor() {
      super();
    }
  }