import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const LoginScreen = ({ navigation }) => {
  const [phoneEmail, setPhoneEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [errors, setErrors] = useState({});

  const roles = [
    { label: "Landlord", value: "landlord" },
    { label: "Tenant", value: "tenant" },
  ];

  // Function to validate email or phone
  const validateEmailOrPhone = (input) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^[0-9]{10,15}$/; // Allow only numbers with a typical phone length
    return emailRegex.test(input) || phoneRegex.test(input);
  };

  const handleLogin = () => {
    let newErrors = {};

    if (!phoneEmail) {
      newErrors.phoneEmail = "Please fill out this form";
    } else if (!validateEmailOrPhone(phoneEmail)) {
      newErrors.phoneEmail = "Please enter a valid email or phone number";
    }

    if (!password) {
      newErrors.password = "Please fill out this form";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!selectedRole) newErrors.selectedRole = "Please fill out this form";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Email/Phone:", phoneEmail);
      console.log("Password:", password);
      console.log("Role:", selectedRole);
      console.log("Logging in...");

      if (selectedRole === "tenant") {
        navigation.navigate("Home");
      } else {
        console.log("Role is not tenant, additional logic needed.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Phone/Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number or email address"
        value={phoneEmail}
        onChangeText={setPhoneEmail}
      />
      {errors.phoneEmail && (
        <Text style={styles.error}>{errors.phoneEmail}</Text>
      )}

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <Text style={styles.label}>Select Role</Text>
      <View style={styles.pickerWrapper}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedRole(value)}
          items={roles}
          placeholder={{
            label: "Select your Role",
            value: null,
            color: "#9EA0A4",
          }}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          Icon={() => (
            <View
              style={{
                backgroundColor: "transparent",
                borderTopWidth: 5,
                borderTopColor: "#2D5DA7",
                borderRightWidth: 5,
                borderRightColor: "transparent",
                borderLeftWidth: 5,
                borderLeftColor: "transparent",
                width: 0,
                height: 0,
              }}
            />
          )}
        />
      </View>

      {errors.selectedRole && (
        <Text style={styles.error}>{errors.selectedRole}</Text>
      )}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.linksContainer}>
        <Text>
          Don’t have an account?{" "}
          <Text
            style={[styles.link, { textDecorationLine: "underline" }]}
            onPress={() => navigation.navigate("SignUp")}
          >
            SIGN UP
          </Text>
        </Text>
        <Text
          style={[styles.link, { textDecorationLine: "underline" }]}
          onPress={() => navigation.navigate("ResetPassword")}
        >
          Forgot Password?
        </Text>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E0E8FC",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 50,
    color: "#2D5DA7",
  },
  label: {
    fontSize: 15,
    marginBottom: 15,
    alignSelf: "flex-start",
    color: "#2D5DA7",
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#2D5DA7",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  pickerWrapper: {
    width: "100%",
    borderColor: "#2D5DA7",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 40,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  loginButton: {
    width: "60%",
    backgroundColor: "#2D5DA7",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 30,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
  },
  linksContainer: {
    alignItems: "center",
  },
  link: {
    color: "#2D5DA7",
    fontWeight: "bold",
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#2D5DA7",
    paddingRight: 30,
  },
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    color: "#2D5DA7",
    paddingRight: 30,
  },
  iconContainer: {
    top: Platform.OS === "android" ? 10 : 15,
    right: 20,
  },
});

export default LoginScreen;
