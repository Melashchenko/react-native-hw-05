import { useEffect, useState } from "react";
import { Button } from "react-native";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.profileImg}>
        <Image
          source={require("../../../assets/images/Rectangle.jpg")}
          style={{ height: 60, width: 60 }}
        />
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image
              source={{ uri: item.photo }}
              style={{ height: 240, borderRadius: 8 }}
            />
            <Text>Title</Text>
            <Button
              title="Comments"
              onPress={() => navigation.navigate("Comments")}
            />
            <Button title="Map" onPress={() => navigation.navigate("Map")} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  postContainer: {
    marginBottom: 32,
  },
  profileImg: {
    marginBottom: 32,
  },
});
