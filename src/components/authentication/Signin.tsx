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
  const { userData, updateUser } = useUserContext();
  const [error, setError] = useState(null);

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

  const handleSignIn = (data: SignInTypes) => {
    fetch(`${process.env.REACT_APP_API_URL}/signin`, {
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
      .catch((error) => setError(error));
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
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
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
      {/* <ParticlesBg type="square" bg={true} /> */}
    </div>
  );
};

export default Signin;
