import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BottomNavigation from "../../Components/BottomNavigation";

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
    {
      image:
        "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg",
      title: "2BHK Apartment",
      location: "Kathmandu, Baneshwor",
      price: "Price = 15,000/Month",
      availability: "Available",
    },
    {
      image:
        "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg",
      title: "Studio Apartment",
      location: "Bhaktapur, Suryabinayak",
      price: "Price = 10,000/Month",
      availability: "Available",
    },
    {
      image:
        "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg",
      title: "3BHK House",
      location: "Patan, Mangalbazar",
      price: "Price = 20,000/Month",
      availability: "Booked",
    },
    {
      image:
        "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg",
      title: "1 Room",
      location: "Lalitpur, Pulchowk",
      price: "Price = 6,000/Month",
      availability: "Available",
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <HeaderBar />
      {/* Removed the SearchBar component */}
      <View style={styles.accommodationHeader}>
        <Text style={styles.accommodationTitle}>Accommodations nearby</Text>
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
    position: "absolute",
    top: 0,
    zIndex: 1,
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
  accommodationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
    marginTop: 100,
  },
  accommodationTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 10,
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
});

export default HomeScreen;
