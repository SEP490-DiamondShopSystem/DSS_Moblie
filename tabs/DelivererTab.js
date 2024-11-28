import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { View } from "react-native";
import DeliveryHome from "../screens/Home/DeliveryHome";

export default function DeliveryTabs() {
  const Stack = createStackNavigator();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Stack.Navigator initialRouteName="DeliveryHome">
        <Stack.Screen
          name="DeliveryHome"
          component={DeliveryHome}
          options={({ navigation }) => ({
            title: "",
            headerTintColor: "black",
            headerStyle: { backgroundColor: "#dec986" },
            headerLeft: null,
            // headerRight: () => (
            //   <View style={{ marginRight: 20 }}>
            //     <Ionicons
            //       name="ellipsis-vertical"
            //       size={24}
            //       color="white"
            //       onPress={() => setShowMenu(true)}
            //     />
            //   </View>
            // ),
          })}
        />
      </Stack.Navigator>
      {/* <MenuAccount showMenu={showMenu} setShowMenu={setShowMenu} /> */}
    </>
  );
}
