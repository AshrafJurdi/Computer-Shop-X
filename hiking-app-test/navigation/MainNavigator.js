import React from "react";
import { Platform, Text } from "react-native";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import {
  Ionicons,
  EvilIcons,
  Entypo,
  Feather,
  MaterialIcons
} from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

// import CategoriesScreen from "../screens/CategoriesScreen";
// import CategoryMealsScreen from "../screens/CategoryMealsScreen";
// import MealDetailScreen from "../screens/MealDetailScreen";
// import FavoritesScreen from "../screens/FavoritesScreen";
// import FiltersScreen from "../screens/FiltersScreen";
import ExploreScreen from "../screen/ExploreScreen";
import MainScreen from "../screen/MainScreen";
import MessagesScreen from "../screen/MessagesScreen";
import ProfileScreen from "../screen/ProfileScreen";
import TrophyScreen from "../screen/TrophyScreen";
import Colors from "../constants/Colors";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "A Screen"
};

const MainMapNavigator = createStackNavigator(
  {
    MainMap: MainScreen
    // CategoryMeals: {
    //   screen: CategoryMealsScreen
    // },
    // MealDetail: MealDetailScreen
  },
  {
    // mode: "modal",
    // initialRouteName: "MealDetail",
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const ExploreNavigator = createStackNavigator(
  {
    Explore: ExploreScreen
    // MealDetail: MealDetailScreen
  },
  {
    // mode: "modal",
    // initialRouteName: "MealDetail",
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MessagesNavigator = createStackNavigator(
  {
    Messages: MessagesScreen
  },
  {
    // mode: "modal",
    // initialRouteName: "MealDetail",
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const TrophyNavigator = createStackNavigator(
  {
    Trophy: TrophyScreen
  },
  {
    // mode: "modal",
    // initialRouteName: "MealDetail",
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  {
    // mode: "modal",
    // initialRouteName: "MealDetail",
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const tabScreenConfig = {
  Explore: {
    screen: ExploreNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <MaterialIcons name="explore" size={25} color={tabInfo.tintColor} />
        );
      },
      // android only
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Explore</Text>
        ) : (
          "Explore"
        )
    }
  },
  Messages: {
    screen: MessagesNavigator,
    navigationOptions: {
      // tabBarLabel: "Favorites!!",
      tabBarIcon: tabInfo => {
        return (
          <Feather name="message-circle" size={25} color={tabInfo.tintColor} />
        );
      },
      //  android only
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Messages</Text>
        ) : (
          "Messages"
        )
    }
  },
  Start: {
    screen: MainMapNavigator,
    navigationOptions: {
      // tabBarLabel: "Favorites!!",
      tabBarIcon: tabInfo => {
        return <Entypo name="direction" size={25} color={tabInfo.tintColor} />;
      },
      //  android only
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Start</Text>
        ) : (
          "Start"
        )
    }
  },
  Trophies: {
    screen: TrophyNavigator,
    navigationOptions: {
      // tabBarLabel: "Favorites!!",
      tabBarIcon: tabInfo => {
        return <EvilIcons name="trophy" size={25} color={tabInfo.tintColor} />;
      },
      //  android only
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Trophies</Text>
        ) : (
          "Trophies"
        )
    }
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      // tabBarLabel: "Favorites!!",
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-grid" size={25} color={tabInfo.tintColor} />;
      },
      //  android only
      tabBarColor: Colors.accentColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Profile</Text>
        ) : (
          "Profile"
        )
    }
  }
};

const MainTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans-bold"
          },
          activeTintColor: Colors.accentColor
        }
      });

// const FiltersNavigator = createStackNavigator(
//   {
//     Filters: FiltersScreen
//   },
//   {
//     // navigationOptions: {
//     //   drawerLabel: "Filters!!!"
//     // },
//     defaultNavigationOptions: defaultStackNavOptions
//   }
// );

// const MainNavigator = createDrawerNavigator(
//   {
//     MealsFavs: {
//       screen: MealsFavTabNavigator,
//       navigationOptions: {
//         drawerLabel: "Meals"
//       }
//     },
//     Filters: FiltersNavigator
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.accentColor,
//       labelStyle: {
//         fontFamily: "open-sans-bold"
//       }
//     }
//   }
// );

export default createAppContainer(MainTabNavigator);
