// src/Screen/FavoriteScreen/FavoriteScreen.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BottomNavigation from "../../Components/BottomNavigation";

const FavoriteItem = ({ property, onPress, onRemoveFavorite }) => {
  return (
    <TouchableOpacity style={styles.favoriteContainer} onPress={onPress}>
      <Image source={{ uri: property.image }} style={styles.propertyImage} />
      <View style={styles.detailsContainer}>
        <View style={styles.propertyInfo}>
          <Text style={styles.propertyTitle}>{property.title}</Text>
          <View style={styles.amenitiesContainer}>
            <View style={styles.amenityItem}>
              <Icon name="bed-outline" size={16} color="#244f76" />
              <Text style={styles.amenityText}>1</Text>
            </View>
            <View style={styles.amenityItem}>
              <Icon name="water-outline" size={16} color="#244f76" />
              <Text style={styles.amenityText}>1</Text>
            </View>
            {property.kitchen && (
              <View style={styles.amenityItem}>
                <Icon name="restaurant-outline" size={16} color="#244f76" />
                <Text style={styles.amenityText}>1</Text>
              </View>
            )}
          </View>
          <Text style={styles.priceText}>Price = {property.price}/Month</Text>
        </View>
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => {
            Alert.alert(
              "Remove from Favorites",
              "Are you sure you want to remove this property from favorites?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Remove",
                  onPress: () => onRemoveFavorite(property.id),
                  style: "destructive",
                },
              ]
            );
          }}
        >
          <Icon name="heart" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const FavoriteScreen = ({ route, navigation }) => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "1BHK Flat for Rent in Kirtipur, Dhalpa, Kathmandu",
      image:
        "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg",
      price: "17,000",
      kitchen: true,
      location: "Kirtipur, Dhalpa",
      availability: "Available",
    },
    {
      id: 2,
      title: "1 Room for Rent in Lalitpur, Ekantakuna",
      image:
        "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg",
      price: "6,000",
      kitchen: false,
      location: "Lalitpur, Ekantakuna",
      availability: "Available",
    },
  ]);

  const handlePropertyPress = (property) => {
    navigation.navigate("PropertyDetail", {
      image: property.image,
      title: property.title,
      location: property.location,
      price: property.price,
      availability: property.availability,
    });
  };

  const handleRemoveFavorite = (propertyId) => {
    setFavorites(favorites.filter((property) => property.id !== propertyId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Favorites</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {favorites.length > 0 ? (
          favorites.map((property) => (
            <FavoriteItem
              key={property.id}
              property={property}
              onPress={() => handlePropertyPress(property)}
              onRemoveFavorite={handleRemoveFavorite}
            />
          ))
        ) : (
          <Text style={styles.noFavoritesText}>No favorites available</Text>
        )}
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dde5ef",
  },
  header: {
    height: 80,
    backgroundColor: "#6A8DB5",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  favoriteContainer: {
    width: "100%",
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  propertyImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 10,
    position: "relative",
  },
  propertyInfo: {
    flex: 1,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#244f76",
    marginBottom: 10,
  },
  amenitiesContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  amenityText: {
    marginLeft: 5,
    color: "#244f76",
    fontSize: 16,
  },
  priceText: {
    fontSize: 12,
    color: "#938d8d",
  },
  heartIcon: {
    position: "absolute",
    top: -155,
    right: 10,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 5,
  },
  noFavoritesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});

export default FavoriteScreen;
