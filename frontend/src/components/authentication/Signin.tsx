import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useUserContext } from "../../state/UserContext";
import { IUser } from "../../types/user";
import AuthStyles from "./Auth.module.css";

type SignInTypes = {
  email: string;
  password: string;
};

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Signin = () => {
  const navigate = useNavigate();
  const { updateUser } = useUserContext();
  const [error, setError] = useState<string | null>(null);

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

  const handleSignIn = async (data: SignInTypes) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signin failed");
      }

      const user = await response.json();

      if (user) {
        loadUser(user); // Load user data into state
        navigate("/face-detector"); // Navigate to the next page
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div className={AuthStyles.AuthWrapper}>
      <h1 className={AuthStyles.AuthTitle}>Sign in</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SigninSchema}
        onSubmit={async (values) => {
          await handleSignIn(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={AuthStyles.Form}>
            <div className={AuthStyles.FormItem}>
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" placeholder="Email" />
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

export default Signin;
