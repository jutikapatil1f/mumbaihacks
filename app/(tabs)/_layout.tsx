import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function TabsLayout() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null); // null while checking

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setLoggedIn(!!token);
      } catch (error) {
        console.error("Error checking token:", error);
        setLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  // Loading state while checking AsyncStorage
  if (loggedIn === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E7FF57" />
      </View>
    );
  }

  // If not logged in, hide tab bar
  if (!loggedIn) {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" }, // hides entire tab bar
        }}
      >
        <Tabs.Screen name="Home" />
      </Tabs>
    );
  }

  // If logged in, show tabs normally
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#030301",
          borderTopColor: "#222",
          height: 60,
        },
        tabBarActiveTintColor: "#FAFAFA",
        tabBarInactiveTintColor: "#999",
        tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
      }}
    >
      <Tabs.Screen name="Home" />
      {/* You can add more tabs here */}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#030301",
    justifyContent: "center",
    alignItems: "center",
  },
});
