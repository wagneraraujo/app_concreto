import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ConfigScreen from '../screens/configs'

//pages

const Stack = createNativeStackNavigator()
export function ConfigStack() {
  // Stack contains Screen & Navigator properties

  return (
    <Stack.Navigator>
      <Stack.Group>
        {/* <Stack.Screen name="AddTranscao" component={AddTranscao} /> */}
        <Stack.Screen
          name="ConfigScreen"
          component={ConfigScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
