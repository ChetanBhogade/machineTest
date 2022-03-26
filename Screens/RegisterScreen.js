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

const RegisterScreen = () => {
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [username, setUsername] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [password, setPassword] = useState();

  const registerUser = () => {
    const bodyFormData = new FormData();
    bodyFormData.append('user_name', username);
    bodyFormData.append('user_email', email);
    bodyFormData.append('user_contact_no', phoneNo);
    bodyFormData.append('user_password', password);
    bodyFormData.append('user_gender', gender);

    axios({
      method: 'POST',
      url: 'https://3-upstesting.com/machine_test/index.php/web_api/Users/Register',
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(function (response) {
        console.log('register response: ', response.data);
      })
      .catch(function (error) {
        console.log('register error: ', error);
      });
  };

  return (
    <View style={styles.main}>
      <View style={styles.formWrapper}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={setGender}
          value={gender}
          placeholder="Gender"
        />
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPhoneNo}
          value={phoneNo}
          placeholder="Phone Number"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          registerUser();
        }}
        style={styles.buttonWrapper}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

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
