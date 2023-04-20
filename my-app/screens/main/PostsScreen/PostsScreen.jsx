import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import DefaultScreenPosts from "../../nested/DefaultScreenPosts/DefaultScreenPosts";
import MapScreen from "../../nested/MapScreen/MapScreen";
import CommentsScreen from "../../nested/CommentsScreen/CommentsScreen";

const Stack = createNativeStackNavigator();

export default function PostsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          headerTitle: {
            color: "#212121",
            fontFamily: "ChakraPetch-Regular",
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.408,
          },
        }}
      />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
    </Stack.Navigator>
  );
}
