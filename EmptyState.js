import { Text, View , Image} from "react-native";

export default function EmptyState() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
      <Image source={require('./assets/images/react-logo.png')}
       style={{width: 200, height: 200}} />
       <Text style={{ color: 'gray', marginTop: 20}}>No photo uploaded yet</Text>
    </View>
  )
}
