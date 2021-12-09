import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProductDetails from 'containers/ProductDetails/ProductDetails';
import ProductDetailsBook from 'containers/ProductDetailsBook/ProductDetailsBook';
import { Modal } from '@redq/reuse-modal';
import ProductSingleWrapper, {
  ProductSingleContainer,
} from 'styled/product-single.style';
import CartPopUp from 'containers/Cart/CartPopUp';
import { useAppDispatch, useAppSelector } from 'helper/hooks';
import { getProductDetail } from 'redux/product/productReducer';
import InlineLoader from 'components/InlineLoader';

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const ProductPage: NextPage<Props> = ({ deviceType }) => {
  const {
    query: { slug },
  } = useRouter();
  const targetRef = React.useRef(null);

  const { loading, productDetail } = useAppSelector(state => state.productReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo({
      top: targetRef.current.offsetTop,
      behavior: 'smooth',
    });

    dispatch(getProductDetail(slug.toString()));
  }, [slug]);

  if (loading && !productDetail) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{productDetail?.title} - SNKR</title>
      </Head>
      {loading && <InlineLoader />}

      <Modal>
        <ProductSingleWrapper ref={targetRef}>
          <ProductSingleContainer>
            {productDetail && (
              <ProductDetails product={productDetail} deviceType={deviceType} />
            )}
            <CartPopUp deviceType={deviceType} />
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};
export default ProductPage;