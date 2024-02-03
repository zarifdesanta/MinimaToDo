export const colors = {
  primaryLight: "#C9C9C9",
  seconderyLight: "#F0F0F0",
  primaryDark: "#161616",
  seconderyDark: "#1F1F1F",
  textLight: "#fff",
  textDark: "#000",
};

//need to make a useState using isDark varibale
// import {primaryTheme} from "..."
// method 1:
// function myPrimaryTheme() {
//   return primaryTheme(isDark);
// }
// method 2:
// primaryTheme(isDark)

export const primaryTheme = (isDark) => {
  if (isDark) {
    return colors.primaryDark;
  } else {
    return colors.primaryLight;
  }
};

export const seconderyTheme = (isDark) => {
  if (isDark) {
    return colors.seconderyDark;
  } else {
    return colors.seconderyLight;
  }
};

export const textTheme = (isDark) => {
  if (isDark) {
    return colors.textLight;
  } else {
    return colors.textDark;
  }
};
