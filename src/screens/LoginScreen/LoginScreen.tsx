import React, { FC, useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'
import style from './LoginScreenStyle';
import { LoginScreenProps } from './LoginScreenProps';


/**
 * Screen component description
 *
 * @returns Screen
 */
const LoginScreen: FC<LoginScreenProps> = ({ route, navigation }) => {
  // From the previous screen
  const initialParams = route?.params

  // Context
  

  // Custom hooks
 

  // Internal state
  

  useEffect(() => {
    
  }, [])

  // Component JSX
  return (
    <SafeAreaView 
    // style={}
      testID='LoginScreen'
    >
      <Text
        // style={}
      >
        This is a screen template
      </Text>
    </SafeAreaView>
  )
};

export default LoginScreen;
