import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { useLoginMutation } from "../../feature/api/apiSlice";
import { useAppDispatch } from "../../feature/hooks";
import { setUser } from "../../feature/session/sessionSlice";
import { NavigationProps, Routes } from "../../routing/types";
import { PRIMARY_COLOR_DARK } from "../../styles/colors";

const Login = ({ navigation }: NavigationProps<Routes.Login>) => {
  const [loginText, setLoginText] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [login] = useLoginMutation();

  const dispatch = useAppDispatch();

  const navigateToRegister = () => {
    navigation.navigate(Routes.Register);
  };

  const handleLogin = () => {
    console.log(loginText);

    login({ login: loginText, password })
      .unwrap()
      .then((data) => {
        dispatch(setUser({ userId: data.user.id, userType: data.user.type }));
        navigation.navigate(Routes.ModeSelect);
      })
      .catch((err) => {
        setErrorMsg(err.data.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <Input
          placeholder="Login"
          leftIcon={{ name: "login" }}
          value={loginText}
          onChangeText={(value) => setLoginText(value)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          leftIcon={{ name: "lock" }}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />

        <Text style={styles.errorMsg}>{errorMsg}</Text>

        <Text style={styles.info}>
          Don't have an account?{" "}
          <Text
            style={{ color: PRIMARY_COLOR_DARK, fontWeight: "bold" }}
            onPress={navigateToRegister}
          >
            Register.
          </Text>
        </Text>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  col: {
    // marginLeft: 10,
    marginStart: 20,
    marginEnd: 20,
    marginTop: 40
  },
  info: {
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 15,
  },
  errorMsg: {
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  }
});

export default Login;
