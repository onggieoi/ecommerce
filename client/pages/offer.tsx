import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import { FormattedMessage } from 'react-intl';
import CartPopUp from 'containers/Cart/CartPopUp';
import { Modal } from '@redq/reuse-modal';

import {
  OfferPageWrapper,
  ProductsRow,
  MainContentArea,
  ProductsCol,
} from 'styled/pages.style';
import GiftCard from 'components/GiftCard/GiftCard';
import SiteFooter from 'components/SiteFooter/SiteFooter';
import { useAppDispatch, useAppSelector } from 'helper/hooks';
import { getCoupons } from 'redux/coupon/couponReducer';
import InlineLoader from 'components/InlineLoader';

type GiftCardProps = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const GiftCardPage: NextPage<GiftCardProps> = ({ deviceType }) => {
  const { coupons, loading } = useAppSelector(state => state.couponReducer);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCoupons())
  }, []);

  return (
    <Modal>
      <Head>
        <title>Offer - SNKR</title>
      </Head>
      {loading && <InlineLoader />}

      <OfferPageWrapper>
        <MainContentArea>
          <div style={{ width: '100%' }}>
            <ProductsRow>
              {coupons
                ? coupons.map(coupon => (
                  <ProductsCol key={coupon.id}>
                    <GiftCard image="/image/offer-3.png" code={coupon.code} />
                  </ProductsCol>
                ))
                : null}
            </ProductsRow>
          </div>
        </MainContentArea>

        <SiteFooter style={{ marginTop: 50 }}>
          SNKR &nbsp; <a href="https://www.instagram.com/onggieoi/">onggieoi, Inc.</a>

        </SiteFooter>
      </OfferPageWrapper>
      <CartPopUp deviceType={deviceType} />
    </Modal>
  );
};
export default GiftCardPage;
