import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const PropertyDetailScreen = ({ navigation, route }) => {
  const { image, title, location, price, availability } = route.params;
  const contactNumber = "9862259947";

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
  };

  const handleContactPress = () => {
    const url = `whatsapp://send?phone=+977${contactNumber}&text=Hello, I am interested in your property.`;
    Linking.openURL(url).catch(() => {
      alert("Make sure Whatsapp is installed on your device");
    });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const dotColor = availability === "Available" ? "green" : "red";

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.detailContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {title} for Rent in Lalitpur, Ekantakuna
          </Text>
          <TouchableOpacity onPress={handleFavoritePress}>
            <Icon
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite ? "red" : "#000"}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.price}>{price} / per month</Text>
        <View style={styles.locationInfo}>
          <Icon name="location-outline" size={24} color="#000" />
          <Text style={styles.location}>3.5 km from Balkhu</Text>
        </View>
        <View style={styles.availabilityInfo}>
          <Icon name="ellipse" size={16} color={dotColor} />
          <Text style={styles.availability}>{availability}</Text>
        </View>
        <Text style={styles.propertyInfo}>Property Owned By: Alok</Text>
        <Text
          style={styles.link}
          onPress={() => Linking.openURL("https://www.google.com/maps")}
        >
          View on Google Maps
        </Text>
        <View style={styles.underline} />
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          1 room for rent at Balkhu with the facilities of bike parking and tap
          water. It offers 1 bedroom, and a common bathroom for whole flat. It
          is suitable for student only. Price is negotiable for student only.
        </Text>
        <Text style={styles.contact}>Contact: {contactNumber}</Text>
        <Text style={styles.sectionTitle}>Facilities</Text>
        <View style={styles.facilitiesList}>
          <Text style={styles.facility}>✓ 1 Room</Text>
          <Text style={styles.facility}>✓ 24/7 Water facility</Text>
          <Text style={styles.facility}>✓ Parking Available</Text>
          <Text style={styles.facility}>✓ 2nd Floor</Text>
        </View>

        <TouchableOpacity
          style={styles.contactButton}
          onPress={handleContactPress}
        >
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd",
  },
  backButton: {
    position: "absolute",
    top: 12,
    left: 10,
    zIndex: 1,
    paddingTop: 30,
  },
  image: {
    width: "100%",
    height: 375,
  },
  detailContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
    color: "#1048b4",
    lineHeight: 28,
    opacity: 0.7,
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 18,
    color: "#2675ec",
    marginVertical: 5,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    opacity: 0.8,
  },
  location: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 5,
  },
  availabilityInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    opacity: 0.8,
  },
  availability: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 5,
  },
  propertyInfo: {
    fontSize: 14,
    color: "#000000",
    marginVertical: 5,
    opacity: 0.6,
  },
  link: {
    fontSize: 14,
    color: "#000000",
    textDecorationLine: "underline",
    opacity: 0.8,
  },
  underline: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "400",
    color: "#256dcd",
    marginTop: 10,
    opacity: 0.8,
  },
  description: {
    fontSize: 14,
    color: "#808080",
    lineHeight: 20,
    marginVertical: 5,
  },
  contact: {
    fontSize: 14,
    color: "#808080",
    marginVertical: 5,
  },
  facilitiesList: {
    marginVertical: 10,
  },
  facility: {
    fontSize: 14,
    color: "#000000",
    opacity: 0.6,
  },
  contactButton: {
    marginTop: 20,
    backgroundColor: "#6786ab",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  contactButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default PropertyDetailScreen;
