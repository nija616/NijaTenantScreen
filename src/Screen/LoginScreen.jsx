import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [phoneEmail, setPhoneEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmailOrPhone = (input) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
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

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Email/Phone:", phoneEmail);
      console.log("Password:", password);
      console.log("Logging in...");

      // Navigate to appropriate screen (update as needed)
      navigation.navigate("TenantHome");
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

export default LoginScreen;
