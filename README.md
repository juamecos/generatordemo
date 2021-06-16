# generatordemo
---
Starting point for creating a simple boilerplate for React Native with Typescript based in npx react-native init PROJECTNAME --template react-native-template-typescript
---
It is using generate-react-cli to be able to create component ans screen folders and files from the command line interface

---
For the moment it is only possible to create components and screens with index.tsx, \*.test.tsx,.\*.styles.tsx, \*.tsx

- to create a component

npx generate-react-cli component CustomText

- to create a screen
npx generate-react-cli component LoginScreen --type=screen

Also has setup for absolute paths 
