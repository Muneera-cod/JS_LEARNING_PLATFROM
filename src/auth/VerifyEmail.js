import { sendEmailVerification } from "firebase/auth";
export const verifyEmail = async (user) =>{
    try{
  if(!user){
    console.log('No user signed in')
    return { message: 'No user signed in' };

  }
  if (user.emailVerified) {
    console.log("Email is already verified.");
    return { message: 'Email is already verified' };

  }
    await sendEmailVerification(user);
    return { message : "Verification email sent successfully."}
}

    catch (error) {
        console.log(user.emailVerified)
        return (error.message || 'Failed to send verification email.');
      }

}