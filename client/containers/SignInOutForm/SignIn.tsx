import React, { useContext } from 'react';
import {
  LinkButton,
  Button,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  OfferSection,
  Offer,
  Input,
  Divider,
} from './SignInOutForm.style';
import { Facebook, Google } from 'components/AllSvgIcon';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage } from 'react-intl';
import { closeModal } from '@redq/reuse-modal';
import { useAppDispatch, useAppSelector } from 'helper/hooks';
import { login } from 'redux/account/accountReducer';
import axiosRequest from 'services/axiosRequest';

export default function SignInModal() {
  const { authDispatch } = useContext<any>(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useAppDispatch();

  const toggleSignUpForm = () => {
    authDispatch({
      type: 'SIGNUP',
    });
  };

  const toggleForgotPassForm = () => {
    authDispatch({
      type: 'FORGOTPASS',
    });
  };

  const handleLogin = () => {
    dispatch(login({
      request: {
        userName: email,
        password,
      },
      callback: loginCallback,
    }));
  }

  const loginCallback = (token: string) => {
    localStorage.setItem('access_token', token);
    authDispatch({ type: 'SIGNIN_SUCCESS' });
    closeModal();

    axiosRequest.setAuthentication(token);
  };

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id='welcomeBack' defaultMessage='Welcome Back' />
        </Heading>

        <SubHeading>
          <FormattedMessage
            id='loginText'
            defaultMessage='Login with your email &amp; password'
          />
        </SubHeading>
        <form onSubmit={handleLogin}>
          <FormattedMessage
            id='emailAddressPlaceholder'
            defaultMessage='Username.'
          >
            {placeholder => (
              <Input
                type='text'
                placeholder={placeholder}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            )}
          </FormattedMessage>

          <FormattedMessage
            id='passwordPlaceholder'
            defaultMessage='Password (min 6 characters)'
          >
            {placeholder => (
              <Input
                type='password'
                placeholder={placeholder}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            )}
          </FormattedMessage>

          <Button
            fullwidth
            title={'Continue'}
            intlButtonId='continueBtn'
            type='submit'
            style={{ color: '#fff' }}
          />
        </form>
        <Divider>
          <span>
            <FormattedMessage id='orText' defaultMessage='or' />
          </span>
        </Divider>

        {/* <Button
          fullwidth
          title={'Continue with Facebook'}
          className='facebook'
          icon={<Facebook />}
          iconPosition='left'
          iconStyle={{ color: '#ffffff', marginRight: 5 }}
          intlButtonId='continueFacebookBtn'
          onClick={loginCallback}
          style={{ color: '#fff' }}
        />

        <Button
          fullwidth
          title={'Continue with Google'}
          className='google'
          icon={<Google />}
          iconPosition='left'
          iconStyle={{ color: '#ffffff', marginRight: 5 }}
          intlButtonId='continueGoogleBtn'
          onClick={loginCallback}
          style={{ color: '#fff' }}
        /> */}

        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id='dontHaveAccount'
            defaultMessage="Don't have any account?"
          />{' '}
          <LinkButton onClick={toggleSignUpForm}>
            <FormattedMessage id='signUpBtnText' defaultMessage='Sign Up' />
          </LinkButton>
        </Offer>
      </Container>

      {/* <OfferSection>
        <Offer>
          <FormattedMessage
            id='forgotPasswordText'
            defaultMessage='Forgot your password?'
          />{' '}
          <LinkButton onClick={toggleForgotPassForm}>
            <FormattedMessage id='resetText' defaultMessage='Reset It' />
          </LinkButton>
        </Offer>
      </OfferSection> */}
    </Wrapper>
  );
}
