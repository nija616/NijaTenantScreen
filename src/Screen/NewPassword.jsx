import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const NewPassword = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validatePassword = () => {
    let newErrors = {};

    const passwordCriteria = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}/;
    if (!newPassword) {
      newErrors.newPassword = "Please enter a new password";
    } else if (!passwordCriteria.test(newPassword)) {
      newErrors.newPassword =
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = () => {
    if (validatePassword()) {
      Alert.alert("Success", "Password has been changed successfully!", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    }
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
        <Text style={styles.headerText}>Create new password</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Create new password</Text>
          <TextInput
            style={styles.input}
            placeholder="New password"
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              setErrors({ ...errors, newPassword: "" });
            }}
            secureTextEntry
          />
          {errors.newPassword && (
            <Text style={styles.errorText}>{errors.newPassword}</Text>
          )}
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Confirm new password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setErrors({ ...errors, confirmPassword: "" });
            }}
            secureTextEntry
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleResetPassword}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: "center",
  },
  header: {
    height: 90,
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
  inputBlock: {
    width: "90%",
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c2c2c",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f6f6f6",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#737a80",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  continueButton: {
    backgroundColor: "#6786ab",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    width: "80%",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default NewPassword;
