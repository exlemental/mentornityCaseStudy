import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { OrgContainer } from '@/Containers'
import OrgDetailsContainer from '@/Containers/OrgDetailsContainer'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Organization" component={OrgContainer} />
      <Tab.Screen name="Repos" component={OrgDetailsContainer} />
    </Tab.Navigator>
  )
}

export default MainNavigator
