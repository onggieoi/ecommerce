import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { openModal } from '@redq/reuse-modal';

import {
  Button,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  HelperText,
  Offer,
  Input,
  Divider,
  LinkButton,
  DeliveryAddress,
  ButtonGroup,
} from './SignInOutForm.style';
import { Facebook, Google } from 'components/AllSvgIcon';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage } from 'react-intl';
import RadioGroup from 'components/RadioGroup/RadioGroup';
import RadioCard from 'components/RadioCard/RadioCard';
import UpdateAddress from 'containers/Checkout/Update/UpdateAddress';
import { Address, Card, Contact, Schedule } from 'models/account';
import { ProfileContext } from 'contexts/profile/profile.context';
import UpdateContact from 'containers/Checkout/Update/UpdateContact';
import { Contact as ContactWapper, PaymentOption } from 'containers/Checkout/Checkout.style';
import PaymentGroup from 'components/PaymentGroup/PaymentGroup';
import StripePaymentForm from 'containers/Payment/StripePaymentForm';
import { UpsertRequest, upsertUser } from 'redux/account/accountReducer';
import { useAppDispatch } from 'helper/hooks';
import axiosRequest from 'services/axiosRequest';
import { useRouter } from 'next/router';


export default function SignOutModal(deviceType: any) {
  const { authDispatch } = useContext<any>(AuthContext);
  const { state, dispatch } = useContext(ProfileContext);
  const [userRequest, setRequest] = useState({} as UpsertRequest);

  const router = useRouter();

  const reduxDispatch = useAppDispatch();

  const { addresses, contacts, cards, schedules } = state as {
    addresses: Address[],
    contacts: Contact[],
    cards: Card[],
    schedules: Schedule[],
  };

  const toggleSignInForm = () => {
    authDispatch({
      type: 'SIGNIN',
    });
  };

  const handleModal = (
    modalComponent: any,
    modalProps = {},
    className: string = 'add-address-modal'
  ) => {
    openModal({
      show: true,
      config: {
        width: 360,
        height: 'auto',
        enableResizing: false,
        disableDragging: true,
        className: className,
      },
      closeOnClickOutside: true,
      component: modalComponent,
      componentProps: { item: modalProps },
    });
  }

  const handleEditDelete = async (item: any, type: string, name: string) => {
    if (type === 'edit') {
      const modalComponent = name === 'address' ? UpdateAddress : UpdateContact;
      handleModal(modalComponent, item);
    } else {
      switch (name) {
        case 'payment':
          dispatch({ type: 'DELETE_CARD', payload: item.id });

        case 'contact':
          dispatch({ type: 'DELETE_CONTACT', payload: item.id });

        case 'address':
          dispatch({ type: 'DELETE_ADDRESS', payload: item.id });

        default:
          return false;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(userRequest);
    console.log(addresses, cards, contacts);

    reduxDispatch(upsertUser({
      request: {
        ...userRequest,
        addresses,
        cards,
        contacts
      },
      callback
    }));
  }

  const callback = (token: string) => {
    localStorage.setItem('access_token', token);
    authDispatch({ type: 'SIGNIN_SUCCESS' });
    router.push('/');

    axiosRequest.setAuthentication(token);
  }

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id='signUpBtnText' defaultMessage='Sign Up' />
        </Heading>

        <SubHeading>
          <FormattedMessage
            id='signUpText'
            defaultMessage='Every fill is required in sign up'
          />
        </SubHeading>

        <FormattedMessage
          id='emailAddressPlaceholder'
          defaultMessage='Email Address or Contact No.'
        >
          {placeholder => <Input
            type='text'
            placeholder={placeholder}
            value={userRequest.userName}
            onChange={(e) => setRequest({
              ...userRequest,
              userName: e.target.value
            })} />}
        </FormattedMessage>

        <FormattedMessage
          id='a'
          defaultMessage='Password (min 6 characters)'
        >
          {placeholder => <Input type='password' placeholder={placeholder}
            value={userRequest.password}
            onChange={(e) => setRequest({
              ...userRequest,
              password: e.target.value
            })} />}
        </FormattedMessage>

        <FormattedMessage
          id='b'
          defaultMessage='Name'
        >
          {placeholder => <Input type='text' placeholder={placeholder}
            value={userRequest.name}
            onChange={(e) => setRequest({
              ...userRequest,
              name: e.target.value
            })}
          />}
        </FormattedMessage>

        <FormattedMessage
          id='b'
          defaultMessage='Contact Number'
        >
          {placeholder => <Input type='number' placeholder={placeholder}
            value={userRequest.contactNumber}
            onChange={(e) => setRequest({
              ...userRequest,
              contactNumber: e.target.value
            })}
          />}
        </FormattedMessage>

        <DeliveryAddress>
          <Heading>
            <FormattedMessage
              id='checkoutDeliveryAddress'
              defaultMessage='Select Your Delivery Address'
            />
          </Heading>
          <ButtonGroup>
            <RadioGroup
              items={addresses}
              component={(item: any) => (
                <RadioCard
                  id={item.id}
                  key={item.id}
                  title={item.name}
                  content={item.info}
                  name='address'
                  checked={item.type === 'primary'}
                  onChange={() =>
                    dispatch({
                      type: 'SET_PRIMARY_ADDRESS',
                      payload: item.id.toString(),
                    })
                  }
                  onEdit={() => handleEditDelete(item, 'edit', 'address')}
                  onDelete={() => handleEditDelete(item, 'delete', 'address')}
                />
              )}
              secondaryComponent={
                <Button
                  title='Add Adderss'
                  iconPosition='right'
                  colors='primary'
                  size='small'
                  variant='outlined'
                  type='button'
                  intlButtonId='addAddressBtn'
                  onClick={() =>
                    handleModal(UpdateAddress, 'add-address-modal')
                  }
                />
              }
            />
          </ButtonGroup>
        </DeliveryAddress>

        <ContactWapper>
          <Heading>
            <FormattedMessage
              id='contactNumberText'
              defaultMessage='Select Your Contact Number'
            />
          </Heading>
          <ButtonGroup>
            <RadioGroup
              items={contacts}
              component={(item: any) => (
                <RadioCard
                  id={item.id}
                  key={item.id}
                  title={item.type}
                  content={item.number}
                  checked={item.type === 'primary'}
                  onChange={() =>
                    dispatch({
                      type: 'SET_PRIMARY_CONTACT',
                      payload: item.id.toString(),
                    })
                  }
                  name='contact'
                  onEdit={() => handleEditDelete(item, 'edit', 'contact')}
                  onDelete={() => handleEditDelete(item, 'delete', 'contact')}
                />
              )}
              secondaryComponent={
                <Button
                  title='Add Contact'
                  iconPosition='right'
                  colors='primary'
                  size='small'
                  variant='outlined'
                  type='button'
                  intlButtonId='addContactBtn'
                  onClick={() =>
                    handleModal(UpdateContact, 'add-contact-modal')
                  }
                />
              }
            />
          </ButtonGroup>
        </ContactWapper>

        {/* PaymentOption */}
        <PaymentOption>
          <Heading>
            <FormattedMessage
              id='selectPaymentText'
              defaultMessage='Select Payment Option'
            />
          </Heading>
          <PaymentGroup
            name='payment'
            deviceType={deviceType}
            items={cards}
            onEditDeleteField={(item: any, type: string) =>
              handleEditDelete(item, type, 'payment')
            }
            onChange={(item: any) =>
              dispatch({
                type: 'SET_PRIMARY_CARD',
                payload: item.id.toString(),
              })
            }
            handleAddNewCard={() => {
              handleModal(
                StripePaymentForm,
                { totalPrice: 0 },
                'add-address-modal stripe-modal'
              );
            }}
          />
        </PaymentOption>

        <HelperText style={{ padding: '20px 0 30px' }}>
          <FormattedMessage
            id='signUpText'
            defaultMessage="By signing up, you agree to Pickbazar's"
          />{' '}
          <Link href='/'>
            <a>
              <FormattedMessage
                id='termsConditionText'
                defaultMessage='Terms &amp; Condtion'
              />
            </a>
          </Link>
        </HelperText>

        <Button
          fullwidth
          title={'Continue'}
          intlButtonId='continueBtn'
          style={{ color: '#fff' }}
          onClick={handleSubmit}
        />

        <Divider>
          <span>
            <FormattedMessage id='orText' defaultMessage='or' />
          </span>
        </Divider>

        {/* <Button
          fullwidth
          title={'Continue with Facebook'}
          iconPosition='left'
          className='facebook'
          icon={<Facebook />}
          iconStyle={{ color: '#ffffff', marginRight: 5 }}
          intlButtonId='continueFacebookBtn'
          style={{ color: '#fff' }}
        />

        <Button
          fullwidth
          title={'Continue with Google'}
          className='google'
          iconPosition='left'
          icon={<Google />}
          iconStyle={{ color: '#ffffff', marginRight: 5 }}
          intlButtonId='continueGoogleBtn'
          style={{ color: '#fff' }}
        /> */}
        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id='alreadyHaveAccount'
            defaultMessage='Already have an account?'
          />{' '}
          <LinkButton onClick={toggleSignInForm}>
            <FormattedMessage id='loginBtnText' defaultMessage='Login' />
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
