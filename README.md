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

#### Set up a Firebase Project

To run this app, you should set up your own firebase project as a dev environment. To do this, navigate to https://console.firebase.google.com/ and click new project. Name it whatever you want. Once its created do the following:
* Add a new iOS app, make sure the bundle id is com.error.amazonhandmadern
  * You'll download a file GoogleServices-Info.plist, place this in your local repo at /AmazonHandmade/ios/
  * Skip Steps 3-5
* Add a new Android app, make sure the package name is com.error.amazonhandmadern
  * You'll download a file google-services.json, place this in your local repo at /AmazonHandmade/android/app/
  * Skip Steps 3-4
* Click the Authentication tab, click the Sign-in method tab, enable Email and Password
* Click the Database tab, scroll down and create a new Realtime Database
  * For ease, choose start in test mode (NOTE: THIS WILL OPEN YOUR DATABASE TO ANYONE - IT IS NOT SECURE)
* Click the Storage tab, click Get Started
* Click the Function tab, click Get Started
  * You can skip the instructions, I'll provide them in the README lower

Now, follow the set up for firebase functions:

##### Firebase Cloud Functions

To contribute to our firebase cloud functions, you need to install some dependenices on your machine. **You will also need to upgrade your Firebase project to the "Blaze" plan for messaging functions to work.** Don't worry, you wont be charged unless you exceed the "Free" tier still which is highly unlikely.

The documentation is here: https://firebase.google.com/docs/functions/get-started

Basically, to get set up, do the following:
```
npm install -g firebase-tools
firebase login
```

Init your local firebase project by running:
```
firebase init functions
```
You'll be guided through set up steps, follow this exactly:
* Select Functions
* Select TypeScript
* Say NO for TSLint
* Then you'll be asked if you want to overwrite files, say NO to all
* Finally, say yes to install dependencies now

If you missed that last step, navigate to the /functions folder and run npm install:
```
cd functions
npm install
```

Then, you need to get a service account api key file for your Firebase project. To do this, open your firebase project in the console, navigate to project settings using the settings wheel. Then, click the service accounts tab and click generate new private key. This should download a json file. Save this file/rename it to "service-account.json". Then, place this file in /funtions/assets in your handmade directory (creating the assets folder if it is not already there).

For messaging to work, you need to create a twilio.json file. First, create a Twilio account if you have not done so yet, and set it up to have a phone number and sms capability. Once you have this done, create a twilio.json file at /functions/assets/ that looks like the following:
```
{
    "accountSid": "YOUR_TWILIO_ACCOUNT_SID_HERE",
    "authToken": "YOUR_TWILIO_AUTH_TOKEN_HERE",
    "phoneNumber": "YOUR_TWILIO_PHONE_NUMBER_HERE (In this format: +1 234 567 8900)"
}
```

Finally, deploy the functions to your firebase project:
```
firebase deploy --only functions
```

You can verify this was done correctly by going back to the Firebase console in your web browser, clicking the Functions tab, and checking to see if they are there.

If you are working on cloud functions and want to test your changes locally run this:
```
firebase serve
```
and then modify any URLs in the source code refering to the cloud to your machine instead.

All of the code for the cloud functions is in the "functions" folder

## Testing for IOS (Android soon to come)

Run the following commands in terminal to get testing set up and run current test for project

``` 
brew tap wix/brew
brew install applesimutils
npm install -g detox-cli
detox build --configuration ios.sim.debug
detox test --configuration ios.sim.debug
```

## To run app
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
## Code Style
 + Each import must be on its own line
```
import {
ArtisanList,
AddArtisan,
ArtisanDetail,
EditArtisan
} from '@screens/ArtisanHub'
```
 + 
