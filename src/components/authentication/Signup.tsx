import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { IUser } from "../../types/user";
import { useUserContext } from "../../state/UserContext";
import AuthStyles from "./Auth.module.css";

type SignUpTypes = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(7, "Too Short!")
    .max(15, "Too Long!")
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

const Signup = () => {
  const navigate = useNavigate();
  const { userData, updateUser } = useUserContext();
  const [error, setError] = useState("This is an error!!!");

  const loadUser = (data: IUser) => {
    updateUser({
      isSignedIn: true,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  const handleSignup = (data: SignUpTypes) => {
    fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          navigate("/face-detector");
        }
      })
      .catch(error => setError(error));
  };

  return (
    <div className={AuthStyles.AuthWrapper}>
      <h1 className={AuthStyles.AuthTitle}>Sign up</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ errors, touched }) => (
          <Form className={AuthStyles.Form}>
            <div className={AuthStyles.FormItem}>
              <label htmlFor="firstName">First Name</label>
              <Field id="firstName" name="firstName" placeholder="Jane" />
              {errors.firstName && touched.firstName ? (
                <div className={AuthStyles.FormError}>{errors.firstName}</div>
              ) : null}
            </div>

            <div className={AuthStyles.FormItem}>
              <label htmlFor="lastName">Last Name</label>
              <Field id="lastName" name="lastName" placeholder="Doe" />
              {errors.lastName && touched.lastName ? (
                <div className={AuthStyles.FormError}>{errors.lastName}</div>
              ) : null}
            </div>

            <div className={AuthStyles.FormItem}>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="jane@acme.com"
                type="email"
              />
              {errors.email && touched.email ? (
                <div className={AuthStyles.FormError}>{errors.email}</div>
              ) : null}
            </div>

            <div className={AuthStyles.FormItem}>
              <label htmlFor="password">Password</label>
              <Field id="password" name="password" type="password" />
              {errors.password && touched.password ? (
                <div className={AuthStyles.FormError}>{errors.password}</div>
              ) : null}
            </div>

            <button type="submit">Submit</button>

            {error && <div className={AuthStyles.Error}>{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
