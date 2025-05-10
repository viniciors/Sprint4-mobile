import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import SinistrosScreen from "../screens/SinistrosScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ size }) => (
            <Image source={require("../../assets/icon.png")} style={{ width: size, height: size }} />
          ),
        }}
      // />
      // <Tab.Screen 
      //   name="Sinistros" 
      //   component={SinistrosScreen} 
      //   options={{
      //     tabBarIcon: ({ size }) => (
      //       <Image source={require("../../assets/icon.png")} style={{ width: size, height: size }} />
      //     ),
      //   }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ size }) => (
            <Image source={require("../../assets/icon.png")} style={{ width: size, height: size }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
