import React, { FC, useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'
import style from './ForgotScreenStyle';
import { ForgotScreenProps } from './ForgotScreenProps';


/**
 * Screen component description
 *
 * @returns Screen
 */
const ForgotScreen: FC<ForgotScreenProps> = ({ route, navigation }) => {
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
      testID='ForgotScreen'
    >
      <Text
        // style={}
      >
        This is a screen template
      </Text>
    </SafeAreaView>
  )
};

export default ForgotScreen;
