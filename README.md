# Amazon Handmade by Error 404

[![Build Status](https://app.bitrise.io/app/da6882a3406c4076/status.svg?token=_GV7vk-FI6Fj_Lg-gufs0A&branch=dev)](https://app.bitrise.io/app/da6882a3406c4076)

This is team Error 404's implementation of the Amazon Handmade capstone project

## Installation

### Set Up React Native

Follow the instructions in the "Installing Dependencies" section for your specific operating system here:
https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies

### Set Up This Project

Run the following commands in a terminal to download, set-up, and run this project.

```
git clone git@github.com:CapStoneError404/AmazonHandMade.git
cd AmazonHandMade
npm i
```

#### Download API key files
There are certain files that shouldn't be hosted on GitHub and so they must be manually downloaded.

There are two Firebase files: google-services.json and GoogleService-Info.plist. These can be downloaded by going to https://console.firebase.google.com/u/0/project/handmade-error-404/settings/general/ and scrolling down to "Your apps". You'll see a download button in the top right of this window, click it for both the Android app and iOS app.

GoogleServices-Info.plist should be placed at /AmazonHandmade/ios/

google-services.json should be placed at /AmazonHandmade/android/app/

Other files may exist, such as for cloud functions, that have instructions in the source code where they are used.

### Testing for IOS (Android soon to come)

Run the following commands in terminal to get testing set up and run current test for project

``` 
brew tap wix/brew
brew install applesimutils
npm install -g detox-cli
detox build --configuration ios.sim.debug
detox test --configuration ios.sim.debug
```



### To run app without testing
To Run:
```
react-native run-ios
```

or

```
react-native run-android
```


## Submitting PRs
First make sure you are following the style guide by running:
```
npm run lint
```

To try to automatically fix errors:
```
npm run lint -- --fix
```


## Firebase Cloud Functions

To contribute to our firebase cloud functions, you need to install some dependenices on your machine.

The documentation is here: https://firebase.google.com/docs/functions/get-started

Basically, to get set up, do the following:
```
npm install -g firebase-tools
firebase login
```

Then, navigate to the /functions folder and run npm install:
```
cd functions
npm install
```

Then, you need to get a service account api key file for your Firebase project. To do this, open your firebase project in the console, navigate to project settings using the settings wheel. Then, click the service accounts tab and click generate new private key. This should download a json file. Save this file/rename it to "service-account.json". Then, place this file in /funtions/assets in your handmade directory (creating the assets folder if it is not already there).

To deploy your changes to the cloud:
```
firebase deploy --only functions
```

To test your changes locally:
```
firebase serve
```
and then modify any URLs in the source code refering to the cloud to your machine instead.

All of the code for the cloud functions is in the "functions" folder
