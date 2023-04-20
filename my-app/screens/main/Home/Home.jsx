import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";
import { Platform, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";

// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#BDBDBD",
        tabBarActiveBackgroundColor: "#FF6C00",
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        tabBarItemStyle: {
          height: 40,
          borderRadius: 50,
          marginBottom: 34,
          marginTop: 9,
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#BDBDBD",
          height: 83,
          paddingHorizontal: 80,
        },
        headerStyle: {
          borderBottomWidth: 1,
          backgroundColor: "#fff",
        },
        headerTitleStyle: {
          color: "#212121",
          fontFamily: "ChakraPetch-Regular",
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: -0.408,
        },

        headerRightContainerStyle: {
          paddingHorizontal: 16,
          // paddingBottom: 0,
        },
        headerLeftContainerStyle: {
          paddingHorizontal: 16,
        },
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather name="grid" color={color} size={24} />
          ),

          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Login")}
            >
              <Icon size={24} name="log-out" color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Create post"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather name="plus" color={color} size={24} />
          ),
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Posts")}
            >
              <Icon size={24} name="arrow-left" color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather name="user" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
