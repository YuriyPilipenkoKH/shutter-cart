import { signOut } from 'next-auth/react';


export const logoutUser = async () => {
  try {
    await signOut({ callbackUrl: '/login' }); // Redirect after logout
      return { 
        success: true, 
        message: "Logout successfull,", 
      }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
