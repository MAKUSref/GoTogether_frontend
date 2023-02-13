import React, { useCallback, useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";
import LoaderStyles from "./styles";

interface LoaderProps {
  logoVisible?: boolean;
}

const Loader = ({ logoVisible = false }: LoaderProps) => {
  const {
    logoContainer,
    logo,
    logoPrefix,
    loaderPage,
    loaderContainer,
    loaderProgress,
  } = LoaderStyles;

  const loaderRotationDegree = useRef(new Animated.Value(0)).current;

  const startRotation = useCallback(() => {
    loaderRotationDegree.setValue(0);

    Animated.loop(
      Animated.timing(loaderRotationDegree, {
        toValue: 360,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  useEffect(() => {
    startRotation();
  }, []);

  return (
    <View style={loaderPage}>
      
      {logoVisible && (
        <View style={logoContainer}>
          <Text style={[logo, logoPrefix]}>Go</Text>
          <Text style={logo}>Together</Text>
        </View>
      )}

      <View style={loaderContainer} accessibilityRole="progressbar">
        <Animated.View
          style={[
            loaderProgress,
            {
              transform: [
                {
                  rotateZ: loaderRotationDegree.interpolate({
                    inputRange: [0, 360],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

export default Loader;
