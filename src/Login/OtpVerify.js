import { useRoute } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import * as React from 'react';
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import {View, Text, Pressable} from 'react-native';
import { Icon } from 'react-native-elements';
import { verifyCode } from '../services/auth';

function OtpVerify({navigation}){
  const route = useRoute();
  const {number, confirmationResult} = route.params;
  const [otp,setOTP]=React.useState('');
  const [loading,setLoading] = React.useState(false);

  const [secondsLeft, setSecondsLeft] = React.useState(30);

    React.useEffect(() => {
      // Check if secondsLeft is greater than 0, then run the interval
      if (secondsLeft > 0) {
        const interval = setInterval(() => {
          setSecondsLeft(prev => prev - 1); // Reduce the seconds by 1 each second
        }, 1000);

        // Clear the interval once the component unmounts or secondsLeft becomes 0
        return () => clearInterval(interval);
      }
    }, [secondsLeft]);

    const verifyOtp = async () => {
      setLoading(true);
      if (confirmationResult && otp) {
      const user =  await verifyCode(confirmationResult, otp);
      if(!user){
        navigation.navigate('Home');
      }
      else{
      Alert.alert('Error', 'Invalid credentials');
      }
      }
      setLoading(false);
    };
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          paddingLeft: 20,
        }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{marginTop: 30, alignSelf: 'flex-start'}}>
          <Icon
            name="arrow-back-outline"
            size={20}
            color={'#000'}
            type="ionicon"
          />
        </Pressable>

        <Text
          style={{
            fontSize: 25,
            color: '#000',
            fontWeight: 'bold',
            marginTop: 40,
          }}>
          Verify Otp
        </Text>
        <Text style={{marginTop: 10, fontSize: 15, lineHeight: 22}}>
          Please enter OTP received at your mobile number{' '}
          {number.slice(0, 6) + '****'}
        </Text>

        <View style={{width: '90%', alignSelf: 'center', alignItems: 'center'}}>
          <OTPInputView
            style={{
              width: '100%',
              alignSelf: 'center',
              marginTop: 50,
              alignItems: 'center',
              justifyContent: 'center',
              height: 30,
            }}
            pinCount={6}
            autoFocusOnLoad
            keyboardType="number-pad"
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={e => {
              setOTP(e);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            marginTop: 50,
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16}}>Auto fetching</Text>
          <Text style={{fontSize: 16}}>{secondsLeft}s</Text>
        </View>
        <Text
          style={{
            fontSize: 14,
            color: '#000',
            alignSelf: 'center',
            marginTop: 80,
          }}>
          Didn't receive an OTP
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#6D38C3',
            alignSelf: 'center',
            marginTop: 10,
            fontWeight: '600',
            textDecorationLine: 'underline',
          }}>
          Resend OTP
        </Text>
        <TouchableOpacity
          onPress={() => {
            verifyOtp();
          }}
          style={styles.verifyButton}>
          {loading ? (
            <ActivityIndicator color={'#fff'} size={'small'} />
          ) : (
            <Text style={styles.verifyButtonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    );
}

export default OtpVerify


const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 50,
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#FAFCFF',
    borderColor: '#D3DAE6',
    color: '#000',
    // fontFamily: fonts.primaryMedium,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  underlineStyleHighLighted: {
    borderColor: '#000',
  },
  verifyButton: {
    backgroundColor: '#6D38C3',
    width: '85%',
    alignSelf:'center',
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 2,
  },
  verifyButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});
