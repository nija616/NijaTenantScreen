import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ navigation }) => {
  const roomData = [
    {
      image:
        "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg",
      title: "1 Room",
      location: "Lalitpur, Ekantakuna",
      price: "Price = 7,000/Month",
      availability: "Available",
    },
    {
      image:
        "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg",
      title: "1BHK Flat",
      location: "Lalitpur-03, Nakhu",
      price: "Price = 5,000/Month",
      availability: "Available",
    },
    {
      image:
        "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg",
      title: "1BHK Flat",
      location: "Lalitpur, Jhamsikhel",
      price: "Price = 7,000/Month",
      availability: "Booked",
    },
    {
      image:
        "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg",
      title: "1BHK Flat",
      location: "Kirtipur-03, Dhalpa",
      price: "Price = 7,000/Month",
      availability: "Booked",
    },
  ];

  const HeaderBar = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.locationContainer}>
          <Text style={styles.currentLocation}>Current Location</Text>
          <View style={styles.locationDetail}>
            <Icon
              name="location-outline"
              size={20}
              style={styles.locationIcon}
            />
            <Text style={styles.city}>Lalitpur</Text>
          </View>
        </View>
      </View>
    );
  };

  const SearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#8f8e8e"
          style={styles.searchInput}
        />
      </View>
    );
  };

  const RoomDetailCard = ({ room }) => {
    const { image, title, location, price, availability } = room;
    const dotColor = availability === "Available" ? "green" : "red";

    const handlePress = () => {
      navigation.navigate("PropertyDetail", {
        image,
        title,
        location,
        price,
        availability,
      });
    };

    return (
      <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.locationContainerCard}>
            <Icon name="location-outline" size={14} style={styles.icon} />
            <Text style={styles.location}>{location}</Text>
          </View>
          <Text style={styles.price}>{price}</Text>
          <View style={styles.availabilityContainer}>
            <Icon
              name="ellipse"
              size={10}
              style={[styles.dotIcon, { color: dotColor }]}
            />
            <Text style={styles.availability}>{availability}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const BottomNavigation = () => {
    return (
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon
            name="home-outline"
            size={24}
            style={[styles.navIcon, styles.activeNavIcon]}
          />
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
          onPress={() => navigation.navigate("Saved")}
        >
          <Icon name="bookmark-outline" size={24} style={styles.navIcon} />
          <Text style={styles.navLabel}>Saved</Text>
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <HeaderBar />
      <SearchBar />
      <View style={styles.accommodationHeader}>
        <Text style={styles.accommodationTitle}>Accommodations nearby</Text>
        <Text style={styles.seeAll}>See All {">"}</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {roomData.map((room, index) => (
          <RoomDetailCard key={index} room={room} />
        ))}
      </ScrollView>
      <BottomNavigation />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dde5ef",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A8DB5",
    height: 90,
    paddingHorizontal: 20,
    width: "100%",
  },
  locationContainer: {
    flex: 1,
    justifyContent: "center",
  },
  currentLocation: {
    fontSize: 20,
    color: "#FFFFFF",
    paddingTop: 30,
    fontWeight: "bold",
  },
  locationDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: 5,
    color: "#FFFFFF",
  },
  city: {
    fontSize: 17,
    color: "#FFFFFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 60,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 10,
    borderColor: "#8e8787",
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
    color: "#000",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#2D5DA7",
  },
  accommodationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  accommodationTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
  },
  seeAll: {
    fontSize: 14,
    color: "#2D5DA7",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cardImage: {
    width: 150,
    height: 110,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
  },
  locationContainerCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: "#898383",
    marginBottom: 5,
    marginLeft: 5,
  },
  price: {
    fontSize: 14,
    color: "#898383",
    marginBottom: 5,
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dotIcon: {
    marginRight: 5,
  },
  availability: {
    fontSize: 14,
    color: "#898383",
  },
  icon: {
    color: "#000",
  },
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
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

export default HomeScreen;
