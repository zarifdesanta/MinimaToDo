import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { primaryTheme, seconderyTheme, textTheme } from "./helper/ColorPalette";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import ToDoScreen from "./screens/ToDoScreen";
import { getData, setData } from "./helper/SaveLoad";
import * as NavigationBar from "expo-navigation-bar";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  function myPrimaryTheme() {
    return primaryTheme(isDark);
  }

  function mySeconderyTheme() {
    return seconderyTheme(isDark);
  }

  function myTextTheme() {
    return textTheme(isDark);
  }

  const iconThemeButtonName = () => {
    if (isDark) {
      return "weather-sunny";
    } else {
      return "weather-night";
    }
  };

  const changeTheme = () => {
    setIsDark(!isDark);
    setData("theme", !isDark);
  };

  useEffect(() => {
    async function setNavBarBgTheme() {
      NavigationBar.setBackgroundColorAsync(mySeconderyTheme());
    }

    setNavBarBgTheme();
  }, [isDark]);

  useEffect(() => {
    async function loadTheme() {
      setIsDark(await getData("theme"));
    }

    loadTheme();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: myPrimaryTheme() }]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      {/**Appbar Row */}
      <View style={styles.appBarRow}>
        <Text style={[styles.titleText, { color: myTextTheme() }]}>To Do</Text>
        <TouchableOpacity onPress={() => changeTheme()}>
          <Icon
            name={iconThemeButtonName()}
            size={32}
            color={myTextTheme()}
          ></Icon>
        </TouchableOpacity>
      </View>

      {/**Todo Screen */}
      <ToDoScreen
        primaryTheme={myPrimaryTheme}
        seconderyTheme={mySeconderyTheme}
        textTheme={myTextTheme}
      ></ToDoScreen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    marginTop: 0,
    fontSize: 36,
    fontWeight: "bold",
  },
  appBarRow: {
    flexDirection: "row",
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 15,
  },
});
