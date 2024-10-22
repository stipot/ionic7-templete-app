

interface UserProfileModel {
    userImage: string;
    name: string;
    membership: string;
    job: string;
    likes: string;
    followers: string;
    following: string;
    about: string;
    friends: 
      {
        image: string,
        name: string
      };
    photos: Array<string>
}