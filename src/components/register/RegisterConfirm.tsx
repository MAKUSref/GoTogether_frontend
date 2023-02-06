import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { NavigationProps, Routes } from "../../routing/types";

const RegisterConfirm = ({
  navigation,
  route,
}: NavigationProps<Routes.RegisterConfirm>) => {
  const { name } = route.params;

  const handleNaviagateToLogin = () => {
    navigation.navigate(Routes.Login);
  };

  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <Text style={[styles.textCenter, { fontSize: 36 }]}>
          Hello, {name}!
        </Text>
        <Text style={[styles.textCenter, { fontSize: 16 }]}>
          You're successfully signed up :{")"}
        </Text>

        <Icon iconStyle={{ fontSize: 110, marginTop: 40 }} type="ant-design" name="checkcircle" color="#80e673" />

        <Button
          onPress={handleNaviagateToLogin}
          containerStyle={{ marginHorizontal: 70, marginTop: 40 }}
          titleStyle={{ paddingVertical: 2 }}
          title="Now Login"
          type="clear"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  col: {
    marginStart: 20,
    marginEnd: 20,
    marginTop: 40,
    marginBottom: 80,
  },
  textCenter: {
    textAlign: "center",
  },
});

export default RegisterConfirm;
