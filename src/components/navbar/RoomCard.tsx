import { StyleSheet, Text, View } from "react-native";
import { Card, Icon, Button } from '@rneui/themed';

interface RoomButtonProps {
  name: string,
  host: string,
  roomId: string,
  type: string
}

const RoomCard = ({name, host, type}: RoomButtonProps) => {
  return (
    <View style={styles.mainContainer}>
      <Card containerStyle={type == 'request' ? styles.cardBlocked : {}}>
        <View style={styles.row} >
          <View style={styles.row}>
            {
            type == 'host' ?  <Icon type="material-community" name="crown" iconStyle={styles.crownIcon}/> : <></>
            }
            {
            type == 'user' ?  <Icon type="ant-design" name="user" iconStyle={styles.userIcon}/> : <></>
            }
            {
            type == 'request' ?  <Icon type="material-community" name="block-helper" iconStyle={styles.userIcon}/> : <></>
            }
           <Text>{name}</Text>            
          </View>
          <View>
            {type == 'request' ? <Button title='Cancel' /> : <Button title='Leave' />}
            
          </View>
        </View>
      </Card>

    </View>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
  },
  cardBlocked: {
    backgroundColor: "#fff"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  crownIcon: {
    color: "#D8C200",
    marginRight: 5,
  },
  userIcon: {
    color: "#000",
    marginRight: 5,
  },
});
export default RoomCard;