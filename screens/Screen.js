import {
  Text,
  View,
  Image,
  TouchableOpacity,
  LogBox,
  FlatList,
} from "react-native";
import EmptyState from "../EmptyState";
import ProgressBar from "../ProgressBar";
import  { Uploading }  from "../Uploading";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { ref,uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { storage, db } from '../firebaseConfig'
import { Video } from "expo-av";

export default function Screen() {

  const [image, setImage] = useState("")
  const [video, setVideo] = useState("")
  const [progress, setProgress] = useState(0)
  const [files, setFiles] = useState([])

  // when array of dependencies change code in function will run
  useEffect(() => { // need to fix: stop it from rerunning continuosly, everytime something is saved in react native the files duplicate on screen
    const unsubscribe = onSnapshot(collection(db, "files"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("new file", change.doc.data())
          setFiles((prevFiles) => [...prevFiles, change.doc.data()])
        }
      })
    }) // observer, function that returns snapshot

    return () => unsubscribe() // clean up function, stops it from running in background
  }, [])  // snapshot info of record

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if(!result.canceled) {
       setImage(result.assets[0].uri)
       // upload the image
       await uploadImage(result.assets[0].uri, "image")
    }
  }

  async function pickVideo() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if(!result.canceled) {
       setImage(result.assets[0].uri)
       // upload the image
       await uploadImage(result.assets[0].uri, "video")
    }
  }

  async function saveRecord(fileType, url, createdAt) {
    try {
      const docRef = await addDoc(collection(db, "files"), {
        fileType,
        url,
        createdAt
      })
      console.log("document saved correctly", docRef.id)
    } catch (error) {
      console.log(error)
    }
  }


  async function uploadImage(uri, fileType) {
    const response = await fetch(uri)
    const blob = await response.blob()
                                    // folder name
    const storageRef = ref(storage, "Stuff/" + new Date().getTime())
    const uploadTask = uploadBytesResumable(storageRef, blob)

    // listen for events
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("upload is " + progress + "% done")
        setProgress(progress.toFixed())
      },
      (error) => {
        // handle error
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL)
          // save record in db
          await saveRecord(fileType, downloadURL, new Date().toISOString())
          setImage("")
          setVideo("")
        })
      }
    )
  }


  return (
    <View style={{ flex: 1}}>
      <FlatList
      data={files}
      keyExtractor={(item) => item.url}
      renderItem={({ item }) => {
        if (item.fileType === "image") {
          return (
            <Image
            source={{ uri: item.url }}
            style={{ width: "34%", height: 100 }}
            />
          )
        } else {
          return (
            <Video
              source={{
                uri: item.url
              }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              style={{ width: "34%", height: 100 }}
              useNativeControls
            />
          )
        }
      }}
      numColumns={3}
      contentContainerStyle={{ gap: 2 }}
      columnWrapperStyle={{ gap: 2 }}
      />
      {image && <Uploading image={image} video={video} progress={progress} />}
      <TouchableOpacity
        onPress={pickImage}
        style={{
          position: "absolute",
          bottom: 90,
          right: 30,
          width: 44,
          height: 44,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
        }}
      >
        <Ionicons name="image" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={pickVideo}
        style={{
          position: "absolute",
          bottom: 150,
          right: 30,
          width: 44,
          height: 44,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
        }}
      >
        <Ionicons name="videocam" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
