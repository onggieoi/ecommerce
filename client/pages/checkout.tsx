import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { useQuery } from "@apollo/react-hooks";
import { Modal } from "@redq/reuse-modal";
import { withApollo } from "helper/apollo";
import Checkout from "containers/Checkout/Checkout";
import { GET_LOGGED_IN_CUSTOMER } from "graphql/query/customer.query";

import { ProfileProvider } from "contexts/profile/profile.provider";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CheckoutPage: NextPage<Props> = ({ deviceType }) => {
  const { data, error, loading } = useQuery(GET_LOGGED_IN_CUSTOMER);
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

export default withApollo(CheckoutPage);
