import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SavedSearchItem = ({ location, type, keyword, area }) => {
  return (
    <View style={savedSearchItemStyles.container}>
      <View style={savedSearchItemStyles.infoContainer}>
        <Icon
          name="location-outline"
          size={20}
          style={savedSearchItemStyles.icon}
        />
        <Text style={savedSearchItemStyles.text}>
          {type} in {location}
        </Text>
      </View>
      <Text style={savedSearchItemStyles.text}>Keyword: {keyword}</Text>
      <Text style={savedSearchItemStyles.text}>Area: {area}</Text>
    </View>
  );
};

const FavoriteItem = ({ title, location, price }) => {
  return (
    <View style={favoriteItemStyles.container}>
      <View>
        <Text style={favoriteItemStyles.text}>{title}</Text>
        <Text style={favoriteItemStyles.text}>{location}</Text>
        <Text style={favoriteItemStyles.text}>Price: {price}</Text>
      </View>
    </View>
  );
};

const savedSearchItemStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#DDE6F5",
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
    color: "#333",
  },
  text: {
    marginHorizontal: 5,
    color: "#333",
  },
});

const favoriteItemStyles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#F5DDE6",
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
  },
  text: {
    color: "#333",
  },
});

const SavedScreen = ({ route, navigation }) => {
  const [activeTab, setActiveTab] = useState("Saved Searches");
  const [savedSearches, setSavedSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (route.params?.savedSearch) {
      setSavedSearches((prev) => [...prev, route.params.savedSearch]);
    }

    if (route.params?.favorite) {
      setFavorites((prev) => [...prev, route.params.favorite]);
    }
  }, [route.params?.savedSearch, route.params?.favorite]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} style={styles.backIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "Favorites" && styles.activeTab]}
          onPress={() => setActiveTab("Favorites")}
        >
          <Text style={styles.tabText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "Saved Searches" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Saved Searches")}
        >
          <Text style={styles.tabText}>Saved Searches</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {activeTab === "Saved Searches" &&
          (savedSearches.length > 0 ? (
            savedSearches.map((search, index) => (
              <SavedSearchItem
                key={index}
                location={search.selectedLocation}
                type={search.selectedType}
                area={search.area}
                keyword={search.keyword}
              />
            ))
          ) : (
            <Text style={styles.placeholderText}>
              No saved searches available.
            </Text>
          ))}

        {activeTab === "Favorites" &&
          (favorites.length > 0 ? (
            favorites.map((favorite, index) => (
              <FavoriteItem
                key={index}
                title={favorite.title}
                location={favorite.location}
                price={favorite.price}
              />
            ))
          ) : (
            <Text style={styles.placeholderText}>No favorites available.</Text>
          ))}
      </ScrollView>

      <BottomNavigation navigation={navigation} />
    </View>
  );
};

const BottomNavigation = ({ navigation }) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Home")}
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

      <TouchableOpacity style={styles.navButton}>
        <Icon name="bookmark-outline" size={24} style={styles.activeNavIcon} />
        <Text style={styles.navLabel}>Saved</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton}>
        <Icon name="person-outline" size={24} style={styles.navIcon} />
        <Text style={styles.navLabel}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1E7F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A8DB5",
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  backIcon: {
    color: "white",
    marginRight: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#8EA8D3",
    paddingHorizontal: 10,
  },
  tabText: {
    fontSize: 18,
    color: "white",
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  placeholderText: {
    textAlign: "center",
    color: "#333",
    marginTop: 20,
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

export default SavedScreen;
