import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';

const EditScreen = ({navigation, route}) => {
  const {item, isEdit} = route.params;

  const [email, setEmail] = useState(item.user_email);
  const [gender, setGender] = useState(item.user_gender);
  const [username, setUsername] = useState(item.user_name);
  const [phoneNo, setPhoneNo] = useState(item.user_phone_no);
  const [password, setPassword] = useState(item.user_pwd);

  const updateDetails = () => {
    axios
      .put(
        'https://3-upstesting.com/machine_test/index.php/web_api/Users/update_user',
        {
          user_id: item.user_id,
          user_name: username,
          user_email: email,
          user_contact_no: phoneNo,
          user_password: password,
          user_gender: gender,
        },
      )
      .then(response => {
        console.log('update response: ', response.data);
        const res = response.data;
        if (res.status === 1) {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
          navigation.goBack();
        }
      });
  };

  return (
    <View style={styles.main}>
      <View style={styles.formWrapper}>
        <TextInput
          style={styles.input}
          onChangeText={isEdit && setEmail}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={isEdit && setGender}
          value={gender}
          placeholder="Gender"
        />
        <TextInput
          style={styles.input}
          onChangeText={isEdit && setUsername}
          value={username}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          onChangeText={isEdit && setPhoneNo}
          value={phoneNo}
          placeholder="Phone Number"
        />
        <TextInput
          style={styles.input}
          onChangeText={isEdit && setPassword}
          value={password}
          placeholder="Password"
        />
      </View>
      {isEdit ? (
        <TouchableOpacity
          onPress={() => {
            // ToastAndroid.show('submit btn clicked', ToastAndroid.LONG);
            updateDetails();
          }}
          style={styles.buttonWrapper}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    // borderWidth: 1,
    width: '70%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonWrapper: {
    marginVertical: 10,
    backgroundColor: '#9b59b6',
  },
  btnText: {
    fontSize: 16,
    padding: 10,
    paddingHorizontal: 15,
    color: '#ffffff',
  },
});
