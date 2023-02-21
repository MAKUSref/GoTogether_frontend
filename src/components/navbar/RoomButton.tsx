import { StyleSheet, Text, View } from "react-native";
import { Card } from '@rneui/themed';

interface RoomButtonProps {
  name: string,
  host: string,
  roomId: string,
}

const RoomButton = ({name, host}: RoomButtonProps) => {
  return (
    <View>
      <Card>
        <Card.Title>Room: {name}</Card.Title>
        <Card.Divider />
      <Text>Host: {host}</Text>        
      </Card>

    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer: {

  },

});
export default RoomButton;