import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    if (!email) return;

    await AsyncStorage.setItem("token", "logged-in-token");

    router.replace("/(tabs)");
  };

  const handleGoogleLogin = async () => {
    await AsyncStorage.setItem("token", "google-token");
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#030301" />

      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#9A9696"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.orText}>OR</View>

        <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleLogin}>
          <AntDesign name="google" size={20} color="#030301" />
          <Text style={styles.googleBtnText}>Continue with Google</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          New user? <Text style={styles.footerHighlight}>Create an account</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#030301",
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    color: "#FAFAFA",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    color: "#9A9696",
    fontSize: 16,
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    color: "#FAFAFA",
    borderColor: "#333",
    borderWidth: 1,
    marginBottom: 24,
  },
  loginBtn: {
    backgroundColor: "#E7FF57",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  loginBtnText: {
    color: "#030301",
    fontSize: 18,
    fontWeight: "700",
  },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#030301",
    paddingVertical: 14,
    borderRadius: 10,
    gap: 10,
    borderColor: "#FAFAFA",
    borderWidth: 1,
  },
  googleBtnText: {
    color: "#FAFAFA",
    fontSize: 16,
    fontWeight: "600",
  },
  orText:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#FAFAFA",
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 14,
    
  },
  footerText: {
    textAlign: "center",
    color: "#9A9696",
    marginTop: 20,
  },
  footerHighlight: {
    color: "#E7FF57",
    fontWeight: "600",
  },
});
