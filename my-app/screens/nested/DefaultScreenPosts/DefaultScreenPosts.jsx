import { useEffect, useState } from "react";
import { Button } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Feather from "react-native-vector-icons/Feather";

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
            <Text style={styles.postTitle}>Title</Text>
            <View style={styles.navigateContainer}>
              <TouchableOpacity
                style={{ marginRight: 6 }}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Comments")}
              >
                <Feather size={20} name="message-circle" color="#BDBDBD" />
              </TouchableOpacity>
              <Text>0</Text>
              <TouchableOpacity
                style={{ marginLeft: 50, marginRight: 6 }}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Map")}
              >
                <SimpleLineIcons
                  size={20}
                  name="location-pin"
                  color="#BDBDBD"
                />
              </TouchableOpacity>
              <Text style={styles.text}>Ivano-Frankivs'k Region, Ukraine</Text>
            </View>
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
  postTitle: {
    paddingVertical: 8,
    color: "#212121",
    fontFamily: "ChakraPetch-Regular",
    fontStyle: "normal",

    fontSize: 16,
    lineHeight: 19,
  },
  postContainer: {
    marginBottom: 32,
  },
  profileImg: {
    marginBottom: 32,
  },
  navigateContainer: {
    flexDirection: "row",
  },
  text: {
    color: "#212121",
    fontFamily: "ChakraPetch-Regular",
    fontStyle: "normal",

    fontSize: 16,
    lineHeight: 19,
  },
});
