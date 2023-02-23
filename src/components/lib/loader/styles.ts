import { StyleSheet } from "react-native";
import { PRIMARY_COLOR, PRIMARY_COLOR_LIGHT_2 } from '../../../styles/colors';

const LOADER_HEIGHT = 64;
const LOADER_BORDER_WIDTH = 4;

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    marginTop: -100,
  },
  logo: {
    fontSize: 40,
    fontWeight: "300",
  },
  logoPrefix: {
    color: PRIMARY_COLOR,
    fontWeight: "500",
  },
  loaderPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    width: LOADER_HEIGHT,
    height: LOADER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  loaderProgress: {
    width: "100%",
    height: "100%",
    borderRadius: LOADER_HEIGHT / 2,
    borderLeftColor: PRIMARY_COLOR_LIGHT_2,
    borderRightColor: PRIMARY_COLOR_LIGHT_2,
    borderBottomColor: PRIMARY_COLOR_LIGHT_2,
    borderTopColor: PRIMARY_COLOR,
    borderWidth: LOADER_BORDER_WIDTH,
  },
  loaderMsg: {
    textAlign: "center",
    marginTop: 10
  }
});

export default styles;
