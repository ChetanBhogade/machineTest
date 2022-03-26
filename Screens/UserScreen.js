import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Item = ({item, navigation}) => {
  const deleteUser = user => {
    axios.delete(
      'https://3-upstesting.com/machine_test/index.php/web_api/Users/remove_user',
      {
        user_id: `${user.user_id}`,
      },
    ).then(response => {
      console.log("user deleted: ", response.data);
      
    }).catch(err => {
      console.log("deleting error: ", err)
    })
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Edit', {
            item: item,
            isEdit: false,
          });
        }}>
        <Text style={styles.title}>{item.user_name}</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          title="Edit"
          color="#6c5ce7"
          onPress={() => {
            console.log('Edit Button Pressed: ', item);
            navigation.navigate('Edit', {
              item: item,
              isEdit: true,
            });
          }}
        />
        <Button
          title="Delete"
          color="#d63031"
          onPress={() => {
            console.log('Delete Button Pressed: ', item, item.user_id);
            deleteUser(item);
          }}
        />
      </View>
    </View>
  );
};

const UserScreen = ({navigation, route}) => {
  const renderItem = ({item}) => <Item item={item} navigation={navigation} />;
  const [data, setData] = useState([]);

  const {username} = route.params;

  useEffect(() => {
    console.log('Effect is running...');
    axios
      .get('https://3-upstesting.com/machine_test/index.php/web_api/Users/')
      .then(response => {
        // console.log('response data: - ', response.data.data);
        setData(response.data.data);
      });
  }, []);

  useEffect(() => {
    navigation.addListener('focus', payload => {
      axios
        .get('https://3-upstesting.com/machine_test/index.php/web_api/Users/')
        .then(response => {
          // console.log('response data: - ', response.data.data);
          setData(response.data.data);
        });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Logged in as: - {username}</Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#0984e3',
    padding: 15,
    marginVertical: 6,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    color: '#ffffff',
  },
  textStyle: {
    fontSize: 26,
    marginVertical: 10,
    marginHorizontal: 15,
    borderBottomWidth: 1,
    paddingBottom: 8,
    fontWeight: 'bold',
  },
});
