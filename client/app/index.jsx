import { Link } from "expo-router";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text} >Edit app/index.tsx to edit this screen.</Text>
        <Link href={"/about"}>About</Link>
        <Image
          style={styles.image}
          source={{ uri: "https://plus.unsplash.com/premium_photo-1747054588178-d2e3f110232a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" }} />
        <Image style={styles.image}
          source={require("@/assets/images/icon.png")}
        />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: "20"
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 20
  },
  text:{
    fontSize: 22,
    color: "purple",
    fontWeight:"bold",
  }
})