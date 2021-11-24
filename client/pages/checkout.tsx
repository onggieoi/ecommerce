import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { Modal } from "@redq/reuse-modal";
import Checkout from "containers/Checkout/Checkout";

import { ProfileProvider } from "contexts/profile/profile.provider";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CheckoutPage: NextPage<Props> = ({ deviceType }) => {
  const { data, error, loading } = {} as any;
  // const { data, error, loading } = useQuery(GET_LOGGED_IN_CUSTOMER);
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) return <div>{error.message}</div>;
  const token = true;

  return (
    <>
      <Head>
        <title>Checkout - PickBazar</title>
      </Head>
      <ProfileProvider initData={data.me}>
        <Modal>
          <Checkout token={token} deviceType={deviceType} />
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default CheckoutPage;
