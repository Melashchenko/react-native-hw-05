import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import Icon from "react-native-vector-icons/Feather";
import { useState } from "react";
import * as Location from "expo-location";

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");

  const takePhoto = async () => {
    const snapData = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log(location);
    setPhoto(snapData.uri);
  };

  const sendPhoto = () => {
    navigation.navigate("Posts", { photo });
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {/* {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 100, width: 100 }}
            />
          </View>
        )} */}
        <TouchableOpacity
          style={styles.snap}
          activeOpacity={0.8}
          onPress={takePhoto}
        >
          <Icon size={20} name="camera" color="#BDBDBD" />
        </TouchableOpacity>
      </Camera>

      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn}
          onPress={sendPhoto}
        >
          <Text style={styles.btnTitle}>Publish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#fff",
  },
  camera: {
    height: 240,
    // borderWidth: 1,
    borderRadius: 8,
    // borderColor: "#E8E8E8",
    // backgroundColor: "#F6F6F6",
    alignItems: "center",
  },
  snap: {
    marginTop: 90,
    borderWidth: 1,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#fff",
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    left: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },
  btn: {
    height: 51,

    borderWidth: 1,
    borderRadius: 100,
    marginTop: 11,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#FF6C00",
      },
      android: {
        backgroundColor: "#FF6C00",
        borderColor: "transparent",
      },
    }),
  },

  btnTitle: {
    fontFamily: "ChakraPetch-Regular",
    fontStyle: "normal",
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: Platform.OS === "ios" ? "#FF6C00" : "#FFFFFF",
  },
});
