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
