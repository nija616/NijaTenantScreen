import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const OTPVerification = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(59);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 59));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleOtpChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      setError("");

      if (text && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "") {
      if (index > 0) inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      setError("Please enter all 4 digits of the OTP");
      return;
    }

    navigation.navigate("NewPassword");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Code verification</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.description}>
          We have sent an OTP code to your email. Enter the code below.
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.resendContainer} disabled>
          <Text style={styles.resendText}>Resend code in {timer} sec</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.enterButton} onPress={handleVerify}>
          <Text style={styles.enterButtonText}>→</Text>
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
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    backgroundColor: "#b7c8f4",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 18,
    width: "100%",
  },
  backButton: {
    position: "absolute",
    left: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: "#2c2c2c",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#2c2c2c",
    textAlign: "center",
    flex: 1,
    marginTop: 25,
  },
  description: {
    fontSize: 16,
    color: "#2c2c2c",
    textAlign: "center",
    marginVertical: 30,
    lineHeight: 24,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
    marginVertical: 20,
  },
  otpInput: {
    width: 66,
    height: 74,
    backgroundColor: "#f6f6f6",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: "#d2d9de",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
  },
  resendContainer: {
    marginTop: 20,
  },
  resendText: {
    color: "#0D277C",
    fontSize: 16,
  },
  enterButton: {
    position: "absolute",
    bottom: 100,
    right: 30,
    backgroundColor: "#8399B9",
    padding: 20,
    borderRadius: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  enterButtonText: {
    color: "#fff",
    fontSize: 24,
  },
});

export default OTPVerification;
