import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SearchScreen = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [area, setArea] = useState("");

  const handleResetPress = () => {
    setKeyword("");
    setSelectedType("All");
    setSelectedLocation("");
    setArea("");
    setShowDropdown(false);
  };

  const handleSearchPress = () => {
    navigation.navigate("Results", {
      keyword,
      selectedType,
      selectedLocation,
      area,
    });
  };

  const propertyTypes = ["All", "Flat", "Room"];
  const locations = ["Kathmandu", "Lalitpur", "Bhaktapur"];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search By</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Types</Text>
          <View style={styles.propertyTypeContainer}>
            {propertyTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.propertyType,
                  selectedType === type && styles.selectedPropertyType,
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text
                  style={[
                    styles.propertyTypeText,
                    selectedType === type ? styles.selectedText : styles.text,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity
            style={styles.locationInput}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Icon name="location-outline" size={24} color="#000" />
            <Text style={styles.locationText}>
              {selectedLocation || "Choose the location"}
            </Text>
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdown}>
              {locations.map((location) => (
                <TouchableOpacity
                  key={location}
                  onPress={() => {
                    setSelectedLocation(location);
                    setShowDropdown(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownText}>{location}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Area</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="For eg. Pulchowk, Thimi, Kirtipur"
              value={area}
              onChangeText={setArea}
              style={styles.textInput}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Keyword</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Please Enter Keyword"
              value={keyword}
              onChangeText={setKeyword}
              style={styles.textInput}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetPress}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchPress}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer/Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="home-outline" size={24} style={styles.navIcon} />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="search-outline" size={24} style={styles.activeNavIcon} />
          <Text style={styles.navLabel}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Saved")}
        >
          <Icon name="bookmark-outline" size={24} style={styles.navIcon} />
          <Text style={styles.navLabel}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="person-outline" size={24} style={styles.navIcon} />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dde5ef",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#6A8DB5",
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "400",
    color: "#FFFFFF",
    marginLeft: 10,
    paddingTop: 3,
  },
  scrollContent: {
    paddingBottom: 70,
  },
  section: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "400",
    color: "#456f96",
    marginBottom: 10,
  },
  propertyTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  propertyType: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    backgroundColor: "#CCCCCC",
  },
  selectedPropertyType: {
    backgroundColor: "#456f96",
  },
  propertyTypeText: {
    fontSize: 16,
  },
  selectedText: {
    color: "#fff",
  },
  text: {
    color: "#000",
  },
  locationInput: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  locationText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#456f96",
  },
  dropdown: {
    backgroundColor: "#EDEDED",
    borderRadius: 5,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
  },
  textInput: {
    fontSize: 16,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  resetButton: {
    backgroundColor: "#c5d0f5",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchButton: {
    backgroundColor: "#6786ab",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
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
  activeNavIcon: {
    color: "green",
  },
  navLabel: {
    fontSize: 14,
    color: "#5f5d5d",
  },
});

export default SearchScreen;
