import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Input, Text } from "react-native-elements";
import { useRegisterMutation } from "../../feature/api/apiSlice";
import { NavigationProps, Routes } from "../../routing/types";
import { PRIMARY_COLOR, PRIMARY_COLOR_DARK } from "../../styles/colors";

const Register = ({ navigation }: NavigationProps<Routes.Register>) => {
  const [name, setName] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [register] = useRegisterMutation();

  const navigateToLogin = () => {
    navigation.navigate(Routes.Login);
  }

  const handleRegister = () => {
    if (name.length === 0) {
      setErrorMsg('Name cannot be empty!');
      return;
    }
    if (login.length === 0) {
      setErrorMsg('Login cannot be empty!');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password has to contain at least 6 letters!');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords are not the same!');
      return;
    }

    setErrorMsg('');
    navigation.navigate(Routes.RegisterConfirm, { name });

    register({name, login, password}).unwrap()
      .then(() => {
        navigation.navigate(Routes.RegisterConfirm, { name });
      })
      .catch(() => {
        setErrorMsg('Login already exist!');
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <Input
          placeholder="Name"
          leftIcon={{ type: 'ant-design', name: "user" }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Login"
          leftIcon={{ name: "login" }}
          value={login}
          onChangeText={(text) => setLogin(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          leftIcon={{ name: "lock" }}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Confirm password"
          secureTextEntry
          leftIcon={{ type: 'foundation', name: "check" }}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <Text style={styles.errorMsg}>{errorMsg}</Text>

        <Text style={styles.info}>
          Already have an account.{" "}
          <Text
            style={{ color: PRIMARY_COLOR_DARK, fontWeight: "bold" }}
            onPress={navigateToLogin}
          >
            Login.
          </Text>
        </Text>
        <Button title="Register" onPress={handleRegister} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  col: {
    marginStart: 20,
    marginEnd: 20,
    marginTop: 100,
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

export default Register;
