// src/Components/BottomNavigation.jsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const BottomNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("TenantHome")}
      >
        <Icon name="home-outline" size={24} style={styles.navIcon} />
        <Text style={styles.navLabel}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Search")}
      >
        <Icon name="search-outline" size={24} style={styles.navIcon} />
        <Text style={styles.navLabel}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Favorites")}
      >
        <Icon name="heart-outline" size={24} style={styles.navIcon} />
        <Text style={styles.navLabel}>Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon name="person-outline" size={24} style={styles.navIcon} />
        <Text style={styles.navLabel}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 51,
  },
  navButton: {
    alignItems: "center",
  },
  navIcon: {
    color: "#000",
  },
  navLabel: {
    fontSize: 14,
    color: "#5f5d5d",
  },
});

export default BottomNavigation;
