import React from 'react';
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

  const { data, error, loading } = {} as any
  //   const { data, error, loading } = useQuery(GET_PRODUCT_DETAILS, {
  //   variables: { slug },
  // });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) return <div>Error: {error.message}</div>;

  let content;
  switch (data.product.type) {
    case 'books': {
      content = (
        <ProductDetailsBook product={data.product} deviceType={deviceType} />
      );
      break;
    }
    default: {
      content = (
        <ProductDetails product={data.product} deviceType={deviceType} />
      );
    }
  }

  return (
    <>
      <Head>
        <title>{data.product.title} - PickBazar</title>
      </Head>
      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
            {content}
            <CartPopUp deviceType={deviceType} />
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};
export default ProductPage;