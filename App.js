import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { PaperProvider } from "react-native-paper";
import StackNavigator from "./stack/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { MenuProvider } from "react-native-popup-menu"; // Thêm import

const App = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <MenuProvider>
            <StatusBar barStyle="light-content" backgroundColor={"#dec986"} />
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
          </MenuProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  </SafeAreaProvider>
);

export default App;
