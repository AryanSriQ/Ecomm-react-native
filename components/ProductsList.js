import { Pressable, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const ProductsList = ({ item }) => {
  return (
    <Pressable style={styles.container}>
      <Image style={styles.containerImage} source={{ uri: item?.image }} />
      <Text numberOfLines={1} style={styles.title}>
        {item.title}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>₹ {item.price}</Text>
        <Text
          style={{ color: "#ffc72c", fontWeight: 500, textAlign: "center" }}
        >
          <AntDesign name="star" size={16} color="#ffc72c" />
          {item.rating.rate}
        </Text>
      </View>
      <Pressable style={styles.cartButton}>
        <Text style={{ fontWeight: 600 }}>Add To Cart</Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductsList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 25
  },
  containerImage: {
    height: 150,
    width: 150,
    resizeMode: "contain"
  },
  title: {
    width: 150,
    marginTop: 10
  },
  priceContainer: {
    flexDirection: "row",
    width: 130,
    marginTop: 10,
    justifyContent: "space-between"
  },
  cartButton: {
    backgroundColor: "#ffc72c",
    padding: 10,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});
