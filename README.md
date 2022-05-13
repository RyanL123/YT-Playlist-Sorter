# YT-Playlist-Sorter

You can find the sorter [here](https://playlist-view-sorter.firebaseapp.com/)

Sort any YouTube playlist based on selected attributes. The playlist does not have to necessarily be your own. **Because of API limits, only the first 200 videos can be retrieved from the playlist.**

# Getting Started

## 1. Dependencies

Install dependencies

```
npm install
```

Install packages in functions

```
cd functions
npm install
```

Install Firebase CLI. Documentation on Firebase CLI can be found [here](https://firebase.google.com/docs/cli)

```
npm install -g firebase-tools
```

## 2. Setting up Firebase

Create a web app on Firebase. More information [here](https://firebase.google.com/docs/web/setup)

Replace [firebaseConfig.js](src/util/firebaseConfig.js) with your own firebase config

```js
export default {
    projectId: "YOUR_PROJECT_ID_HERE",
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_AUTH_DOMAIN_HERE,
};
```

Then, login to Firebase through the command line and follow the instructions

```
firebase login
```

Initialize a project and follow the command line instructions

```
firebase init
```

## 3. Setting up YouTube Data API

To obtain a valid YouTube API key, follow the instructions [here](https://developers.google.com/youtube/v3/guides/implementation)

Create .env in functions

```
cd functions
touch .env
```

Enter your own API key in this format

```
YOUTUBE_API_KEY=your_api_key_here
```

## 4. Deploying to Firebase

Make sure this line is **commented out** within [playlistUtil.js](src/util/playlistUtil.js), which is used by Firebase Emulators for testing

```js
// connectFunctionsEmulator(functions, "localhost", 5001);
```

Generate a build for production

```
npm run build
```

Deploy to firebase (make sure you're logged in to Firebase-CLI)

```
firebase deploy
```

## 5. Testing locally

To use Firebase Emulators, make sure this line is **uncommented** within [playlistUtil.js](src/util/playlistUtil.js)

```js
connectFunctionsEmulator(functions, "localhost", 5001);
```

Run Firebase Emulators

```
firebase emulators:start
```

Navigate to http://locahost:4000 to view the Emulator UI

# Contributing

Feel free to open a PR or submit a issue. Whether it's a new feature or a bug, feedback is always welcome!
