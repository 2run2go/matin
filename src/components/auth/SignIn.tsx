import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import * as Yup from "yup";
import { Formik } from "formik";
import GoogleButton from "react-google-button";

import { Alert as MuiAlert } from "@mui/material";
import { spacing } from "@mui/system";

import useAuth from "../../hooks/useAuth";

const Alert = styled(MuiAlert)(spacing);

function SignIn() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useAuth();

  const googleButtonClicked = () => {
    signInWithGoogle().then((result) => {
      const user = result.user;
      if (user && user.uid) {
        localStorage.setItem("isLogin", "yes");
        navigate("/inbox");
      }
    });
  };

  return (
    <Formik
      initialValues={{
        email: "demo@bootlab.io",
        password: "unsafepassword",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await signIn(values.email, values.password);

          navigate("/private");
        } catch (error: any) {
          const message = error.message || "Something went wrong";

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleSubmit }) => (
        <form noValidate onSubmit={handleSubmit}>
          {errors.submit && (
            <Alert mt={2} mb={3} severity="warning">
              {errors.submit}
            </Alert>
          )}
          <div>
            <GoogleButton
              style={{ display: "block", margin: "auto" }}
              // type="light1111"
              onClick={() => {
                googleButtonClicked();
              }}
            />
          </div>
        </form>
      )}
    </Formik>
  );
}

export default SignIn;
