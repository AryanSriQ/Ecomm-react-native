import { StyleSheet, View, Pressable, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

const Search = () => {
  return (
    <View style={styles.searchContainer}>
      <Pressable style={styles.searchBox}>
        <Feather
          name="search"
          size={24}
          color="black"
          style={styles.searchIcon}
        />
        <TextInput placeholder="search amazon" style={styles.searchInput} />
      </Pressable>
      <Feather name="mic" size={24} color="black" />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00CED1",
    padding: 10,
    paddingTop: 40,
    paddingBottom: 15,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    width: 320,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "lightgray",
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    padding: 10,
  },
  searchIcon: {
    marginLeft: 5,
    color: "black",
    zIndex: -1,
    opacity: 0.7,
    marginLeft: 20,
  },
});
