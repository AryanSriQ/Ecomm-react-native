import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import React from "react";
import { Border, Search } from "../components";
import { useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { Feather, AntDesign, Entypo } from "@expo/vector-icons";

const ProductInfo = () => {
  // Get the current route from the navigation stack
  const route = useRoute();

  // Extract the 'data' parameter from the route
  const data = route.params.data;

  // Get the width of the window
  const width = Dimensions.get("window").width;

  // Calculate the height based on the width
  const height = (width * 100) / 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Search />
      <View style={styles.shareOfferContainer}>
        <View style={styles.offer}>
          <Text style={styles.offerText}>{data?.offer}</Text>
        </View>
        <View>
          <Feather name="share-2" style={styles.shareIcon} />
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.carouselImages.map((image, index) => (
          <ImageBackground
            source={{ uri: image }}
            key={index}
            style={[{ width, height }, styles.imageContainer]}
          >
            <View></View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View>
        <AntDesign name="hearto" style={styles.heartIcon} />
      </View>
      <View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.price}>₹ {data.price}</Text>
        <Border />
      </View>
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Color:</Text>
          <Text style={[styles.title, { fontWeight: "bold" }]}>
            {data?.color}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text style={styles.title}>Size: </Text>
          <Text style={[styles.title, { fontWeight: "bold" }]}>
            {data?.size}
          </Text>
        </View>
      </View>
      <Border />
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={[styles.title, { fontWeight: "bold" }]}>
          Total : {data?.price}
        </Text>
      </View>
      <View>
        <Text style={{ marginLeft: 20, fontSize: 16, color: "aqua" }}>
          Free Delivery tomorrow by 3pm Order within 10hr 30min
        </Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text
          style={[
            styles.title,
            { fontWeight: "bold", marginRight: -15, marginLeft: 10 },
          ]}
        >
          <Entypo name="location-pin" size={24} />
        </Text>
        <Text style={styles.title}>Delivery to Aryan - Noida 201307</Text>
      </View>
      <Text style={[styles.title, { color: "limegreen" }]}>In Stock</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.addToCartBtn}>
          <Pressable>
            <Text style={styles.button}>Add To Cart</Text>
          </Pressable>
          <Pressable>
            <Text style={[styles.button, { backgroundColor: "#ffac1e" }]}>
              Buy now
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {},
  offer: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 25,
    width: 50,
    height: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  shareOfferContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: 15,
    marginRight: 25,
    marginTop: 20,
  },
  shareIcon: {
    fontSize: 30,
  },
  offerText: {
    color: "white",
    fontWeight: "900",
    fontSize: 12,
    textAlign: "center",
  },
  heartIcon: {
    fontSize: 25,
    opacity: 0.5,
    marginLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    marginLeft: 20,
  },
  price: {
    fontSize: 19,
    fontWeight: "700",
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
  },
  button: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#ffc72c",
    margin: 10,
    fontSize: 18,
  },
});
