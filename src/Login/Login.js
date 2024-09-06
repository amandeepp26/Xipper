import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { signInWithPhoneNumber } from '../services/auth';

function Login({navigation}) {
  const [number,setNumber] = useState('');
  const [loading,setLoading] = useState(false)
const [confirmation, setConfirmation] = useState(null);

const sendOtp = async () => {
  setLoading(true);
  const confirmationResult = await signInWithPhoneNumber(`+91${number}`);
  setConfirmation(confirmationResult);
  navigation.navigate('OtpVerify', {
    number: number,
    confirmationResult: confirmationResult,
  });
  setLoading(false);
};

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.titleText}>Welcome to</Text>
          <Image
            source={require('../../assets/Images/logo.png')}
            style={{
              width: 130,
              height: 30,
              marginTop: 25,
            }}
          />

          <Text style={styles.signUpText}>Sign Up or Login</Text>

          <View style={styles.inputContainer}>
            <View style={styles.countryCodeContainer}>
              <Image
                source={{
                  uri: 'https://cdn2.iconfinder.com/data/icons/flags-68/48/India-512.png',
                }}
                style={styles.flagImage}
              />
              <Text style={styles.countryCodeText}>+91</Text>
            </View>

            <TextInput
              placeholder="Please enter your number"
              maxLength={10}
              value={number}
              onChangeText={e => {
                setNumber(e);
              }}
              keyboardType="numeric"
              style={styles.phoneNumberInput}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              if (number != '') {
                sendOtp();
                // navigation.navigate('OtpVerify',{number:number});
              }
            }}
            style={styles.verifyButton}>
            {loading ? (
              <ActivityIndicator color={'#6D38C3'} size={'small'} />
            ) : (
              <Text style={styles.verifyButtonText}>Verify</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.referralText}>
            Have a <Text style={styles.boldUnderlineText}>Referral Code?</Text>
          </Text>
          <Text style={styles.bottomText}>
            By Continuing you agree to App's{' '}
            <Text style={styles.boldUnderlineText}>Terms of Services</Text> and{' '}
            <Text style={styles.boldUnderlineText}>Privacy Policy</Text>
          </Text>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6D38C3',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  titleText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    // textShadowColor: 'black',
    // textShadowOffset: {width: 2, height: 2},
    // textShadowRadius: 1,
    marginTop:150
  },
  signUpText: {
    fontSize: 20,
    marginTop: 120,
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 30,
    width: '85%',
    alignItems: 'center',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 10,
  },
  flagImage: {
    width: 30,
    height: 35,
    borderRadius: 50,
  },
  countryCodeText: {
    marginLeft: 10,
    color: '#000',
  },
  phoneNumberInput: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: 250,
    marginLeft: 10,
    elevation: 10,
    paddingLeft: 15,
  },
  verifyButton: {
    backgroundColor: 'white',
    width: '85%',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 10,
  },
  verifyButtonText: {
    fontSize: 16,
    color: '#6D38C3',
    fontWeight: '500',
  },
  referralText: {
    fontSize: 14,
    marginTop: 30,
    color: 'white',
  },
  boldUnderlineText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  bottomText: {
    fontSize: 14,
    color: 'white',
    width: '80%',
    textAlign: 'center',
    // marginBottom: 100,
    lineHeight: 20,
    // position: 'absolute',
    bottom: -120,
  },
});

export default Login;
