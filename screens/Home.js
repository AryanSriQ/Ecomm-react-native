import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ImageSlider from "react-native-image-slider";
import { trendingImages, trendingList, deals, offers } from "../constants";
import axios from "axios";
import { ProductsList, Search } from "../components";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "Jewelery", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
    { label: "Women's Clothing", value: "women's clothing" },
  ]);
  const navigation = useNavigation();

  useEffect(() => {
    // Define an asynchronous function fetchData
    const fetchData = async () => {
      try {
        // Make a GET request to the specified URL using axios library
        const { data } = await axios.get("https://fakestoreapi.com/products");
        // Set the fetched data to the "products" state variable
        setProducts(data);
      } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS === "android" ? "40" : 0 },
      ]}
    >
      <ScrollView>
        <Search />
        <View style={[styles.locationContainer, { padding: 10 }]}>
          <Ionicons name="location-outline" size={24} color="black" />
          <Pressable style={styles.locationContainer}>
            <Text style={{ fontSize: 13, fontWeight: 500 }}>
              Deliver to Aryan - Noida 201607
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {trendingList.map((data, index) => {
            return (
              <Pressable key={index} style={styles.trendingItem}>
                <Image
                  source={{ uri: data.image }}
                  style={styles.trendingImages}
                />
                <Text style={styles.trendingText}>{data.name}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <ImageSlider
          loop
          autoPlayWithInterval={4000}
          images={trendingImages}
          style={{ height: 200, width: "100%", padding: 0, margin: 0 }}
        />
        <Text style={{ fontSize: 18, fontWeight: "bold", margin: 10 }}>
          Trending Deals of the week
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {deals.map((data, index) => {
            return (
              <Pressable key={index} style={styles.dealContainer}>
                <Image source={{ uri: data.image }} style={styles.dealImage} />
                {/* <View style={styles.dealDetailsContainer}>
                  <Text numberOfLines={3} style={styles.dealTitle}>
                    {data.title}
                  </Text>
                  <Text style={styles.dealPrice}>
                    <Text style={styles.dealPriceText}>₹</Text>
                    {data.price}
                  </Text>
                </View> */}
              </Pressable>
            );
          })}
        </View>
        <Text
          style={{
            height: 1,
            width: "100%",
            borderColor: "#d0d0d0",
            borderWidth: 1,
            marginTop: 10,
          }}
        />
        <Text
          style={{
            padding: 10,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Today's Deal
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map((data) => (
            <Pressable
              style={{ margin: 10 }}
              onPress={() => {
                navigation.navigate("Info", { data: data });
              }}
            >
              <Image
                style={{ height: 150, height: 150, resizeMode: "contain" }}
                source={{ uri: data.image }}
              />
              <View
                style={{
                  width: 130,
                  paddingVertical: 5,
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  backgroundColor: "red",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "white",
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {data.offer}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <Text
          style={{
            height: 1,
            width: "100%",
            borderColor: "#d0d0d0",
            borderWidth: 1,
            marginTop: 20,
          }}
        />
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            width: "45%",
            marginBottom: open ? 50 : 15,
            zIndex: 100,
          }}
        >
          <DropDownPicker
            style={{
              borderColor: "#B7B7B7",
              height: 30,
              marginBottom: open ? 120 : 15,
              zIndex: 100,
              overflow: "hidden",
            }}
            open={open}
            value={category}
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder={"choose category"}
          />
        </View>
        <View style={[styles.productContainer, { zIndex: 10 }]}>
          {products
            ?.filter((items) => items?.category === category)
            .map((data, index) => (
              <ProductsList index={index} item={data} />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#AAFEEE",
  },
  trendingItem: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  trendingImages: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: "hidden",
  },
  trendingText: {
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  dealContainer: {
    flexDirection: "row",
  },
  dealImage: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  dealDetailsContainer: {
    flex: 2,
    justifyContent: "center",
  },
  dealTitle: {
    fontSize: 16,
  },
  dealPrice: {
    fontSize: 14,
    marginTop: 5,
  },
  dealPriceText: {
    fontSize: 20,
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
});
