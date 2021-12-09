import React, { useContext } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/auth";
import {
  FormFields,
  FormLabel,
  FormTitle,
  Error
} from "../../components/FormFields/FormFields";
import { Wrapper, FormWrapper, LogoImage, LogoWrapper } from "./Login.style";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Logoimage from "../../image/snkr.png";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import { login } from "../../redux/account/accountReducer";

const initialValues = {
  userName: "",
  password: ""
};

const getLoginValidationSchema = () => {
  return Yup.object().shape({
    userName: Yup.string().required("Username is Required!"),
    password: Yup.string().required("Password is Required!")
  });
};

const MyInput = ({ field, form, ...props }) => {
  return <Input {...field} {...props} />;
};

export default () => {
  let history = useHistory();
  // let location = useLocation();

  const { } = useAppSelector(state => state.accountReducer);
  const dispatch = useAppDispatch();

  const { authenticate, isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) return <Redirect to={{ pathname: "/" }} />;

  // let {} = location.state || { from: { pathname: "/" } };

  const handleLogin = ({ userName, password }) => {
    dispatch(login({
      request: { userName, password },
      callback: loginCallback,
    }));
  };

  const loginCallback = (token: string) => {
    authenticate(token, () => {
      history.replace('/');
    });
  }

  return (
    <Wrapper>
      <FormWrapper>
        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <FormFields>
                <LogoWrapper>
                  <LogoImage src={Logoimage} alt="snkr-admin" />
                </LogoWrapper>
                <FormTitle>Log in to SNKR admin</FormTitle>
              </FormFields>

              <FormFields>
                <FormLabel>Username</FormLabel>
                <Field
                  type="text"
                  name="userName"
                  component={MyInput}
                  placeholder="Ex: demo"
                />
                {errors.userName && touched.userName && (
                  <Error>{errors.userName}</Error>
                )}
              </FormFields>
              <FormFields>
                <FormLabel>Password</FormLabel>
                <Field
                  type="password"
                  name="password"
                  component={MyInput}
                  placeholder="Ex: demo"
                />
                {errors.password && touched.password && (
                  <Error>{errors.password}</Error>
                )}
              </FormFields>
              <Button
                type="submit"
                disabled={isSubmitting}
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      width: "100%",
                      marginLeft: "auto",
                      borderTopLeftRadius: "3px",
                      borderTopRightRadius: "3px",
                      borderBottomLeftRadius: "3px",
                      borderBottomRightRadius: "3px"
                    })
                  }
                }}
              >
                Submit
              </Button>
            </Form>
          )}
          validationSchema={getLoginValidationSchema}
        />
      </FormWrapper>
    </Wrapper>
  );
};
