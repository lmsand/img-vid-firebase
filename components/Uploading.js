import {
  Image,
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
} from "react-native";

import { BlurView, VibrancyView } from "@react-native-community/blur";
import { ProgressBar } from "./ProgressBar";
import { Video } from "expo-av";

export function Uploading({ image, video, progress }) {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        },
      ]}
    >
      <VibrancyView
        blurType="ultraThinMaterialDark"
        style={StyleSheet.absoluteFill}
      ></VibrancyView>
      <BlurView
        style={{
          width: "70%",
          alignItems: "center",
          paddingVertical: 16,
          rowGap: 12,
          borderRadius: 14
        }}
        blurType="light"
      >
        {/* if image, show image */}
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
              borderRadius: 6,
            }}
          />
        )}
        {/* if video, show video */}
        {video && (
          <Video
            source={{
              uri: video,
            }}
            videoStyle={{}}
            rate={1.0}
            isMuted={false}
            resizeMode="contain"
            // should play
            // isLooping
            style={{ width: 200, height: 200 }}
            // useNativeControls
          />
        )}
        <Text style={{ fontSize: 12 }}>Uploading...</Text>
        <View style={{ height: 1, borderWidth: StyleSheet.hairlineWidth, width: "100%", borderColor: "#00000020"}} />
        <TouchableOpacity>
          <Text style={{ fontWeight: "500", color: "#347856", fontSize: 17 }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}
