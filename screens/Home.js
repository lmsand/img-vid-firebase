import { Text, View, Image } from "react-native";
import EmptyState from '../EmptyState'
import ProgressBar from "../components/ProgressBar"
import { Uploading } from "../components/Uploading"

export default function Home() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <EmptyState /> */}
      <Uploading />
      <ProgressBar progress={50} />
    </View>
  )
}
