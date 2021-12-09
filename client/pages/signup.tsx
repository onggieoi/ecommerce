import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Modal } from "@redq/reuse-modal";
import Checkout from "containers/Checkout/Checkout";

import { ProfileProvider } from "contexts/profile/profile.provider";
import { useAppDispatch, useAppSelector } from "helper/hooks";
import { getMe } from "redux/account/accountReducer";
import { AuthContext } from "contexts/auth/auth.context";
import { useRouter } from "next/router";
import SignUp from "containers/SignInOutForm/SignUp";
import { Account } from "models/account";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CheckoutPage: NextPage<Props> = ({ deviceType }) => {
  const router = useRouter();

  const { authState } = useContext<any>(AuthContext);

  return (
    <>
      <Head>
        <title>Checkout - SNKR</title>
      </Head>
      <ProfileProvider initData={{
        addresses: [],
        cards: [],
        contacts: []
      } as Account}>
        <Modal>
          <SignUp deviceType={deviceType} />
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default CheckoutPage;
