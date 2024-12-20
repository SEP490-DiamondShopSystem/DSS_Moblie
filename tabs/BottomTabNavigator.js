// BottomTabNavigator.js
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Import screen components
import { useSelector } from "react-redux";
// import defaultAvatar from "../assets/avatar_default.png";
import { getUserSelector } from "../redux/selectors";
import DeliveryHome from "../screens/Home/DeliveryHome";
import OrderScreen from "../screens/OrderScreen/OrderScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  // const userSelector = useSelector(getUserSelector);
  // const [image, setImage] = useState(userSelector.avatar_url);

  // useEffect(() => {
  //   if (!userSelector.avatar_url) {
  //     setImage(defaultAvatar);
  //   } else {
  //     setImage(userSelector.avatar_url);
  //   }
  // }, [userSelector.avatar_url]);

  return (
    <Tab.Navigator
      initialRouteName="DeliveryHome"
      screenOptions={{
        tabBarActiveTintColor: "#dec986",
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="DeliveryHome"
        component={DeliveryHome}
        options={{
          headerShown: true, // Ensure the header is shown
          headerTitle: "Trang Chủ", // Custom header title
          tabBarLabel: "Đơn Hàng",
          headerTitleAlign: "center",
          tabBarLabel: "Trang Chủ",
          tabBarIcon: ({ color, size }) => (
            <Icon name={"home-outline"} color={color} size={size + 5} />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          headerShown: true, // Ensure the header is shown
          headerTitle: "Danh Sách Đơn Hàng", // Custom header title
          tabBarLabel: "Đơn Hàng",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="truck-delivery-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
