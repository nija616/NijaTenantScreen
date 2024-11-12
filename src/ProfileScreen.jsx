import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState({
    name: "czsdczx",
    age: "21",
    gender: "Female",
    profilePicture:
      "https://i.pinimg.com/originals/81/46/3e/81463e00329f9f7ea644de094abbb772.jpg",
  });

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission is required to access the media library.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileData((prevData) => ({
        ...prevData,
        profilePicture: result.uri,
      }));
    }
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const handleChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  const handleAboutUs = () => {
    navigation.navigate("AboutUs");
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        onPress: () => {
          navigation.navigate("Login");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: profileData.profilePicture }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.uploadText}>Edit Picture</Text>
          </TouchableOpacity>
          <Text style={styles.username}>{profileData.name}</Text>
          <Text style={styles.details}>
            {profileData.age} | {profileData.gender}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <TouchableOpacity style={styles.option} onPress={handleEditProfile}>
            <View style={styles.optionContent}>
              <Ionicons
                name="pencil-outline"
                size={20}
                color="#333"
                style={styles.icon}
              />
              <Text style={styles.optionText}>Edit Profile</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={handleChangePassword}
          >
            <View style={styles.optionContent}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#333"
                style={styles.icon}
              />
              <Text style={styles.optionText}>Change Password</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleSettings}>
            <View style={styles.optionContent}>
              <Ionicons
                name="settings-outline"
                size={20}
                color="#333"
                style={styles.icon}
              />
              <Text style={styles.optionText}>Settings</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, { borderBottomWidth: 0 }]}
            onPress={handleAboutUs}
          >
            <View style={styles.optionContent}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#333"
                style={styles.icon}
              />
              <Text style={styles.optionText}>About Us</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <BottomNavigation />
    </View>
  );
};

const BottomNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="home-outline" size={24} style={[styles.navIcon]} />
        <Text style={styles.navLabel}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Search")}
      >
        <Ionicons name="search-outline" size={24} style={styles.navIcon} />
        <Text style={styles.navLabel}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Saved")}
      >
        <Ionicons name="bookmark-outline" size={24} style={styles.navIcon} />
        <Text style={styles.navLabel}>Saved</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons
          name="person-outline"
          size={24}
          style={[styles.navIcon, styles.activeNavIcon]}
        />
        <Text style={styles.navLabel}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 80,
    backgroundColor: "#6A8DB5",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E0E0E0",
  },
  uploadButton: {
    marginTop: 10,
    backgroundColor: "#6A8DB5",
    padding: 6,
    borderRadius: 8,
  },
  uploadText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  username: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  details: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
  },
  section: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#E7EFFB",
    borderRadius: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#666666",
    marginBottom: 10,
    marginLeft: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomColor: "#D1D1D1",
    borderBottomWidth: 1,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  optionText: {
    fontSize: 16,
    color: "#333333",
  },
  arrow: {
    fontSize: 22,
    color: "#666666",
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderColor: "#007AFF",
    borderWidth: 1,
    alignItems: "center",
  },
  logoutText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    height: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: "#E0E0E0",
    borderTopWidth: 1,
  },
  navButton: {
    alignItems: "center",
  },
  navIcon: {
    color: "#000",
  },
  activeNavIcon: {
    color: "green",
  },
  navLabel: {
    fontSize: 14,
    color: "#5f5d5d",
  },
});

export default ProfileScreen;
