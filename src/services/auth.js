import auth from '@react-native-firebase/auth';

const signInWithPhoneNumber = async phoneNumber => {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    // Save this confirmation object to verify the code later
    return confirmation;
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};

const verifyCode = async (confirmation, code) => {
  try {
    const userCredential = await confirmation.confirm(code);
    console.log('User signed in:', userCredential);
  } catch (error) {
    console.error('Invalid code:', error);
  }
};

export {signInWithPhoneNumber,verifyCode}