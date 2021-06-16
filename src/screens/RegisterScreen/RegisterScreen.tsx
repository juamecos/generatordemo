import React, { FC, useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'
import style from './RegisterScreenStyle';
import { RegisterScreenProps } from './RegisterScreenProps';


/**
 * Screen component description
 *
 * @returns Screen
 */
const RegisterScreen: FC<RegisterScreenProps> = ({ route, navigation }) => {
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
      testID='RegisterScreen'
    >
      <Text
        // style={}
      >
        This is a screen template
      </Text>
    </SafeAreaView>
  )
};

export default RegisterScreen;
