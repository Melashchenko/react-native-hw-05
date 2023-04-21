import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import Icon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // let text = "Waiting..";
  // if (errorMsg) {
  //   return (text = errorMsg);
  // }
  // else if (location) {
  //   text = JSON.stringify(location);
  // }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>

        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();

    setPhoto(uri);
  };

  const sendPhoto = () => {
    if (!photo) {
      return;
    }
    navigation.navigate("DefaultScreen", { photo });
    setPhoto("");
    console.log(location);
    console.log(errorMsg);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera} type={type}>
        <TouchableOpacity
          style={styles.snap}
          activeOpacity={0.8}
          onPress={takePhoto}
        >
          <Icon size={20} name="camera" color="#BDBDBD" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 50 }} onPress={toggleCameraType}>
          <MaterialCommunityIcons
            size={20}
            name="camera-flip"
            color="#BDBDBD"
          />
        </TouchableOpacity>
      </Camera>
      <View>
        <Text style={styles.imgText}>Download photo</Text>
      </View>
      <View>
        <TextInput style={styles.input} placeholder="Name" />

        <View>
          <TextInput
            style={{
              height: 50,

              borderBottomWidth: 1,
              borderColor: "#E8E8E8",

              marginBottom: 16,
              color: "#212121",
              fontFamily: "ChakraPetch-Regular",
              fontStyle: "normal",

              fontSize: 16,
              lineHeight: 19,
              paddingHorizontal: 24,
            }}
            placeholder="Location"
          />
          <SimpleLineIcons
            style={styles.icon}
            size={20}
            name="location-pin"
            color="#BDBDBD"
          />
        </View>
      </View>
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
    marginBottom: 8,
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

  imgText: {
    marginBottom: 16,
    color: "#BDBDBD",
    fontFamily: "ChakraPetch-Regular",
    fontStyle: "normal",

    fontSize: 16,
    lineHeight: 19,
  },

  input: {
    height: 50,

    borderBottomWidth: 1,
    borderColor: "#E8E8E8",

    marginBottom: 16,
    color: "#212121",
    fontFamily: "ChakraPetch-Regular",
    fontStyle: "normal",

    fontSize: 16,
    lineHeight: 19,
  },

  icon: {
    position: "absolute",
    top: 14,
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
