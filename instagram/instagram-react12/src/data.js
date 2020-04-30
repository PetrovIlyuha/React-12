import { v4 as uuid } from "uuid";

export const defaultUser = {
  id: uuid(),
  username: "Pavel Stoyanoff",
  name: "Pavel",
  profile_image:
    "http://latitudes-sample.com/wp-content/uploads/2016/03/Miniclip-8-Ball-Pool-Avatar-8-300x300.png",
  // profile_image:
  // "https://instagram.com/static/images/anonymousUser.jpg/23e7b3b2a737.jpg"
};

export function getDefaultUser() {
  return {
    id: uuid(),
    username: "username",
    name: "name",
    profile_image:
      "http://latitudes-sample.com/wp-content/uploads/2016/03/Miniclip-8-Ball-Pool-Avatar-8-300x300.png",
  };
}

export const defaultPost = {
  id: uuid(),
  likes: 10,
  caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
  user: defaultUser,
  media:
    "https://scontent-ort2-2.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/80126161_2456912044637768_8188145638093587415_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com&_nc_cat=108&_nc_ohc=GAkCBeSLLnwAX_Xn25U&oh=58af570f5ad051b24583c388b946784a&oe=5EA44484",
  comments: [],
  created_at: "2020-02-28T03:08:14.522421+00:00",
};

export function getDefaultPost() {
  return {
    id: uuid(),
    likes: 10,
    caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
    user: defaultUser,
    media:
      "https://scontent-ort2-2.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/80126161_2456912044637768_8188145638093587415_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com&_nc_cat=108&_nc_ohc=GAkCBeSLLnwAX_Xn25U&oh=58af570f5ad051b24583c388b946784a&oe=5EA44484",
    comments: [],
    created_at: "2020-02-28T03:08:14.522421+00:00",
  };
}

export const defaultNotifications = [
  {
    id: uuid(),
    type: "follow",
    user: defaultUser,
    created_at: "2020-02-29T03:08:14.522421+00:00",
  },
  {
    id: uuid(),
    type: "like",
    user: defaultUser,
    post: defaultPost,
    created_at: "2020-02-29T03:08:14.522421+00:00",
  },
];

export const defaultCurrentUser = {
  id: uuid(),
  username: "me",
  name: "myself",
  profile_image:
    "http://latitudes-sample.com/wp-content/uploads/2016/03/Miniclip-8-Ball-Pool-Avatar-8-300x300.png",
  email: "me@gmail.com",
  website: "softclubplus.com",
  bio: "This is my bio",
  phone_number: "555-555-5555",
  posts: Array.from({ length: 10 }, () => getDefaultPost()),
  followers: [defaultUser],
  following: [defaultUser],
};
