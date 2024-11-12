import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ResultsScreen = ({ route, navigation, onSaveSearch }) => {
  const { keyword, selectedType, selectedLocation, area } = route.params || {};

  const [sortVisible, setSortVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Newest");

  const listings = [
    {
      id: 1,
      title: "1 Room",
      location: "Lalitpur, Ekantakuna",
      price: "7,000/Month",
      status: "Available",
      image:
        "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg",
    },
    {
      id: 2,
      title: "1BHK Flat",
      location: "Lalitpur-03, Nakhu",
      price: "5,000/Month",
      status: "Available",
      image:
        "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg",
    },
    {
      id: 3,
      title: "1BHK Flat",
      location: "Kirtipur-03, Dhalpa",
      price: "7,000/Month",
      status: "Booked",
      image:
        "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg",
    },
  ];

  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      selectedLocation
    )}`;
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const toggleSortVisibility = () => {
    setSortVisible(!sortVisible);
  };

  const toggleMenuVisibility = () => {
    setMenuVisible(!menuVisible);
  };

  const saveSearch = () => {
    console.log("Save Search clicked");
    if (onSaveSearch) {
      const searchDetails = {
        keyword,
        selectedType,
        selectedLocation,
        area,
      };
      onSaveSearch(searchDetails);
    }
    setMenuVisible(false);
  };

  const handleSortSelection = (option) => {
    setSelectedSort(option);
    setSortVisible(false);
  };

  const viewPropertyDetails = (listing) => {
    navigation.navigate("PropertyDetail", {
      image: listing.image,
      title: listing.title,
      location: listing.location,
      price: listing.price,
      availability: listing.status,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Results</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={openMaps}>
            <Icon
              name="map-outline"
              size={24}
              color="#000"
              style={styles.iconSpacing}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenuVisibility}>
            <Icon name="ellipsis-vertical" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <View style={styles.filter}>
          <Icon name="home-outline" size={16} color="#456f96" />
          <Text style={styles.filterText}>{selectedType}</Text>
        </View>
        <View style={styles.filter}>
          <Icon name="location-outline" size={16} color="#456f96" />
          <Text style={styles.filterText}>{selectedLocation}</Text>
        </View>
        <View style={styles.filter}>
          <Icon name="location" size={16} color="#456f96" />
          <Text style={styles.filterText}>{area}</Text>
        </View>
        <View style={styles.filter}>
          <Icon name="search" size={16} color="#456f96" />
          <Text style={styles.filterText}>{keyword}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>
            {listings.length} Results - Showing ‘{selectedSort}’
          </Text>
          <TouchableOpacity onPress={toggleSortVisibility}>
            <Icon name="filter-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {listings.map((listing) => (
          <TouchableOpacity
            key={listing.id}
            style={styles.listingContainer}
            onPress={() => viewPropertyDetails(listing)}
          >
            <Image source={{ uri: listing.image }} style={styles.image} />
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{listing.title}</Text>
              <View style={styles.locationContainer}>
                <Icon name="location-outline" size={16} color="#456f96" />
                <Text style={styles.location}>{listing.location}</Text>
              </View>
              <Text style={styles.price}>Price = {listing.price}</Text>
              <Text style={styles.status}>
                Status:
                <Text
                  style={
                    listing.status === "Available"
                      ? styles.available
                      : styles.booked
                  }
                >
                  {listing.status}
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {sortVisible && (
        <View style={styles.sortContainer}>
          <Text style={styles.sortHeader}>Sort by</Text>
          {["Newest", "Oldest", "Price(low to high)", "Price(high to low)"].map(
            (option) => (
              <TouchableOpacity
                key={option}
                style={styles.sortOption}
                onPress={() => handleSortSelection(option)}
              >
                <Icon
                  name={
                    selectedSort === option
                      ? "radio-button-on"
                      : "ellipse-outline"
                  }
                  size={20}
                  color="#1c3a56"
                />
                <Text style={styles.sortText}>{option}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      )}

      {menuVisible && (
        <View style={styles.saveSearchContainer}>
          <TouchableOpacity
            style={styles.saveSearchButton}
            onPress={saveSearch}
          >
            <Icon name="bookmark-outline" size={20} color="#152946" />
            <Text style={styles.saveSearchText}>Save Search</Text>
          </TouchableOpacity>
        </View>
      )}

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
    </View>
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
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#6A8DB5",
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingTop: 4,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginRight: 15,
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0f4f8",
    paddingVertical: 10,
  },
  filter: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#456f96",
  },
  scrollContent: {
    paddingBottom: 70,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  resultsTitle: {
    fontSize: 20,
    color: "#375672",
  },
  listingContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  location: {
    marginLeft: 5,
    fontSize: 16,
    color: "#456f96",
  },
  price: {
    fontSize: 16,
    color: "#898383",
  },
  status: {
    fontSize: 16,
  },
  available: {
    color: "green",
  },
  booked: {
    color: "red",
  },
  sortContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    backgroundColor: "#c1d9f9",
    borderRadius: 20,
    padding: 15,
    zIndex: 1,
  },
  sortHeader: {
    fontSize: 20,
    color: "#31506d",
    fontWeight: "bold",
    marginBottom: 10,
  },
  sortOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  sortText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#1c3a56",
  },
  saveSearchContainer: {
    position: "absolute",
    top: 70,
    right: 15,
    backgroundColor: "#519db5",
    borderRadius: 10,
    padding: 10,
    zIndex: 2,
  },
  saveSearchButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  saveSearchText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#152946",
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

export default ResultsScreen;
