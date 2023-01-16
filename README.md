## Social login
Sign in and sign up functionallity for React Native projects with Firebase Auth.  
Works on iOS, Android and Web.  
Sign in with email and username, Google or Facebook.  

If you need to authenticate using Apple you need to follow these steps:  
[Authenticate Using Apple with JavaScript](https://firebase.google.com/docs/auth/web/apple)  

## Built With

React Native, Expo, Firebase, React Native Paper.

## Setup

1. Create a Firebase project.
2. Add Firebase Authentication to your project.
3. Copy your Firebase config.
4. Create a env.ts file and place your Firebase config inside.

Later you should transform this file into a .env file or/and use Expo Secrets.  
Learn more: [Environment variables and secrets](https://docs.expo.dev/build-reference/variables/)

### Install

Make sure all required dependecies are installed by,
from the project root folder, typing:

```
yarn install
```

### Start

Then start the project with:

```
yarn run start
```

There might be some issues with running this on web if you are using node version >v18.12.  
A workaround has been implemented in this project.  
See this GitHub issue: [Error using Node 19 with expo-cli start --web](https://github.com/expo/expo-cli/issues/4575)
If you intend to run this for web you need to use:

```
yarn run web
```

## Authors

* **Johan Abdé**
