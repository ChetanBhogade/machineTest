import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
  const [text, onChangeText] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  const loginUser = () => {
    axios
      .get(
        'https://3-upstesting.com/machine_test/index.php/web_api/Users/login',
        {
          params: {
            user_email: text,
            user_pwd: password,
          },
        },
      )
      .then(response => {
        console.log('response', response.data);
        const res = response.data;
        console.log('Username: - ', res.data[0].user_name, res.status);
        if (res.status === 1) {
          showToast(res.message);
          navigation.navigate('Users', {
            username: res.data[0].user_name,
          });
        } else {
          showToast(res.message);
        }
      });
  };

  return (
    <View style={styles.main}>
      <View style={styles.formWrapper}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          // showToast('Login btn clicked');
          loginUser();
        }}
        style={styles.buttonWrapper}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // showToast('Sign up btn clicked');
          navigation.navigate('Register');
        }}>
        <Text style={{color: '#6c5ce7', fontSize: 16}}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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
