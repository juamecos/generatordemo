# Lapix Game Front End React Native App
---
Mobile Application for Kaminky game

---

React Native App with Typescript consuming GraphQL API 

---
User can register, log in and restore password via OTP code sent by email.

Location and camera permissions should be provided to use the app.

A registered user can see the stones other users uploaded. User can filter the stones by country, time of creation, more liked stones and nearest to his actual position. User can like, comment stones.

When a user finds a stone he can register the found by adding the code of the stone, the location where it was found and a picture for verification purpouses. The owner of the stone will be notified and can verify the found in App Notifications (To be implemented)

User has a profile where he can edit his avatar, change password, 

---
It is using generate-react-cli to be able to create component ans screen folders and files from the command line interface

---
For the moment it is only possible to create components and screens with index.tsx, \*.test.tsx,.\*.styles.tsx, \*.tsx

- to create a component

npx generate-react-cli component CustomText

- to create a screen
npx generate-react-cli component LoginScreen --type=screen

Also has setup for absolute paths 

Includes login and signup forms with Formik and Yup for validation

In order to test Formik without warnings in jest console we user @testing-library/jest-native as in this issue was explained

https://stackoverflow.com/questions/65753374/react-native-test-failed-when-using-formik-and-yup-as-validation-schema


