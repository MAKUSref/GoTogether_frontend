import { ReactComponentElement, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
  ScrollView,
} from "react-native";
import { Text } from "react-native-elements";
import { useFetchMyRoomsQuery } from "../../feature/api/apiSlice";
import { useAppSelector } from "../../feature/hooks";
import { NavigationProps, Routes } from "../../routing/types";
import {
  PRIMARY_COLOR_DARK,
  PRIMARY_COLOR,
  PRIMARY_COLOR_LIGHT,
  PRIMARY_COLOR_LIGHT_2,
} from "../../styles/colors";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const minNavbarPosition = 60;
const navbarMaxHeight = screenHeight * 0.5;
const maxMaskOpacity = .4;

interface NavbarProps {
  topSection?: JSX.Element, 
  bottomSection?: JSX.Element, 
}

const Navbar = ({topSection=<></>, bottomSection=<></>}: NavbarProps) => {
  const [navbarPosition, setNavbarPosition] = useState<number>(screenHeight - minNavbarPosition);
  const [maskOpacity, setMaskOpacity] = useState<number>(0);

  const sessionState = useAppSelector((state) => state.session);



  const handleTouch = (e: GestureResponderEvent) => {
    // setNavbarPosition(e.nativeEvent.locationY)
    // console.log(e.nativeEvent.pageY);
    let newNavbarPosition = e.nativeEvent.pageY;

    if (newNavbarPosition > screenHeight - minNavbarPosition) {
      newNavbarPosition = screenHeight - minNavbarPosition;
    } else if (newNavbarPosition < screenHeight - navbarMaxHeight) {
      newNavbarPosition = screenHeight - navbarMaxHeight;
    }


    setNavbarPosition(newNavbarPosition);
    const newMaskOpacity = (navbarPosition - (screenHeight - minNavbarPosition)) / ((screenHeight - navbarMaxHeight) - (screenHeight - minNavbarPosition));
    setMaskOpacity(newMaskOpacity);
  };

  const snapNavbar = () => {
    if(navbarPosition > screenHeight - ((minNavbarPosition + navbarMaxHeight)/2)){
      hideNavbar();
    }else{
      showNavbar();
    }
  }

  const hideNavbar = async () => {
    await setNavbarPosition(screenHeight - minNavbarPosition);
    setMaskOpacity(0);
  }

  const showNavbar = () =>{
    setNavbarPosition(screenHeight - navbarMaxHeight);
    setMaskOpacity(1);
  }

  return (
    <View style={styles.mainContainer} >
      <View style={[styles.mask, { opacity: maskOpacity * maxMaskOpacity, display: maskOpacity===0 ? "none" : "flex"}]} onTouchEnd={hideNavbar}/>
      <View
        style={[
          styles.navbarContainer,
          styles.shadowProp,
          { height: navbarMaxHeight, top: navbarPosition },
        ]}
        
      >
        <View style={styles.dragHandleContainer} onTouchMove={handleTouch} onTouchEnd={snapNavbar}> 
          <View style={styles.dragHandle}/>
        </View>
        <View style={[styles.navbarContent,{opacity: maskOpacity}]}>
          {/* <UserInfo userId={sessionState.userId || "Guest"} username={sessionState.username || ""}/> */}
          {topSection}
        </View>
        {/* <Rooms/> */}
        {bottomSection}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  mask: {
    height: "100%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.5,
  },
  navbarContainer: {
    backgroundColor: "#FFFFFF",
    color: PRIMARY_COLOR_DARK,
    position: "absolute",
    height: "50%",
    width: "100%",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  dragHandleContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    paddingTop: 10,
    paddingBottom: 10,
  },
  dragHandle: {
    width: "30%",
    height: 7,
    backgroundColor: PRIMARY_COLOR_DARK,
    marginTop: 10,
    borderRadius: 50,
  },
  navbarContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 20
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 50,
    },
    shadowOpacity: 100,
    shadowRadius: 13.84,
    
    elevation: 12,
  },
});

export default Navbar;
