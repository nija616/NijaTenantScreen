import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSignUp = () => {
    let newErrors = {};

    if (!fullName) newErrors.fullName = "Please fill out this form";
    if (!phone) newErrors.phone = "Please fill out this form";
    if (!email) newErrors.email = "Please fill out this form";
    if (!password) newErrors.password = "Please fill out this form";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please fill out this form";

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Signed up successfully!");
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      )}

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.loginRedirect}
      >
        <Text>
          Already have an account?{" "}
          <Text style={[styles.link, { textDecorationLine: "underline" }]}>
            LOGIN
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 30,
    color: "#2D5DA7",
  },
  input: {
    width: "100%",
    padding: 15,
    borderColor: "#2D5DA7",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  signupButton: {
    width: "60%",
    backgroundColor: "#2D5DA7",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  signupButtonText: {
    color: "white",
    fontSize: 18,
  },
  loginRedirect: {
    marginTop: 10,
  },
  link: {
    color: "#2D5DA7",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 15,
  },
});

export default SignUpScreen;
