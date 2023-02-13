import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RouteApp from "./src/routing/RouteApp";
import { Provider } from "react-redux";
import { store } from "./src/feature/store";
import { ThemeProvider } from "react-native-elements";

const App = () => (
  <NavigationContainer>
    <Provider store={store}>
      <ThemeProvider>
        <RouteApp />
      </ThemeProvider>
    </Provider>
  </NavigationContainer>
);

export default App;
