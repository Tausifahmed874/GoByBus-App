import axiosInstance from '@/api/axios';
import { useAuthStore } from '@/store/useAuthStore';
import { Alert } from 'react-native';

export const SendEmail = async ({ email }: { email: string }) => {
  console.log(email);

  try {
    const response = await axiosInstance.post('/auth/get-email', { email });
    return response.data;
  } catch (error) {
    console.error(error);
    console.log(error);
    Alert.alert('Something wrong!', "OTP doesn't send. Please try after some time");
    throw error;
  }
};

export const VerifyOtp = async ({ otp }: { otp: number }) => {
  try {
    const response = await axiosInstance.post('/auth/verify-otp', { otp });
    console.log(response.data);

    const { name, role } = response.data.user;

    if (name && role) {
      useAuthStore.getState().login(response.data.user, response.data.user.token);
      return { status: 'existing', user: response.data.user };
    } else {
      return { status: 'new' };
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Login Failed', 'There is a problem while try to Login. Please try again later.');
    throw error;
  }
};

export const register = async ({}) => {
  try {
  } catch (error) {
    console.error(error);
  }
};
