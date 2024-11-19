import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

const BottomNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const getIconColor = (routeName) => {
    if (routeName === "Search") {
      return route.name === "Search" || route.name === "Result"
        ? "green"
        : "#000";
    }
    return route.name === routeName ? "green" : "#000";
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("TenantHome")}
      >
        <Icon
          name="home-outline"
          size={24}
          style={{ color: getIconColor("TenantHome") }}
        />
        <Text style={[styles.navLabel, { color: getIconColor("TenantHome") }]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Search")}
      >
        <Icon
          name="search-outline"
          size={24}
          style={{ color: getIconColor("Search") }}
        />
        <Text style={[styles.navLabel, { color: getIconColor("Search") }]}>
          Search
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon
          name="person-outline"
          size={24}
          style={{ color: getIconColor("Profile") }}
        />
        <Text style={[styles.navLabel, { color: getIconColor("Profile") }]}>
          Profile
        </Text>
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
  navLabel: {
    fontSize: 14,
    color: "#5f5d5d",
  },
});

export default BottomNavigation;
