import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import PropTypes from "prop-types";

function Login({ onLoginSuccess }) {
  const handleLoginSuccess = (CredentialResponse) => {
    console.log("Google Credential Response: ", CredentialResponse);
    const credential = CredentialResponse?.credential;
    if (credential) {
      onLoginSuccess(credential);
    } else {
      console.error("Credential not found in the response");
    }
  };

  const handleLoginError = (error) => {
    console.log("Login Failed", error);
  };

  return (
    <GoogleOAuthProvider clientId="427526772134-2m2nd7u51h8mh8a15v1sglelmsp4k954.apps.googleusercontent.com">
      <div className="login-container flex justify-center items-center h-screen overflow-x-hidden">
        <div className="login-box p-8 rounded-2xl shadow-lg bg-gray-800">
          <h1 className="text-center text-2xl mb-4">
            Enhance Your Productivity with Task Box
          </h1>
          <p className="text-gray-400 p-4 text-center">
            Log in to get started on your tasks.
          </p>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default Login;
