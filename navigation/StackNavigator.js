import React from "react";
import { Home, LoginScreen, RegisterScreen, ProductInfo } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient();

  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: () => <Entypo name="home" size={24} color="black" />
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Home}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: () => (
              <FontAwesome5 name="user-alt" size={24} color="black" />
            )
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Home}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: () => (
              <Entypo name="shopping-cart" size={24} color="black" />
            )
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="main"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Info"
            component={ProductInfo}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
