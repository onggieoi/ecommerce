import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { openModal, closeModal } from '@redq/reuse-modal';
import ProductCard from 'components/ProductCard/ProductCard';
import {
  ProductsRow,
  ProductsCol,
  ButtonWrapper,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
} from './Products.style';
import { CURRENCY } from 'helper/constant';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Placeholder from 'components/Placeholder/Placeholder';
import Fade from 'react-reveal/Fade';
import NoResultFound from 'components/NoResult/NoResult';
import { useAppDispatch, useAppSelector } from 'helper/hooks';
import { getMore, getProducts, ProductQuery } from 'redux/product/productReducer';
import { Product } from 'models/product';
import { SearchContext } from 'contexts/search/search.context';
import InlineLoader from 'components/InlineLoader';

const QuickView = dynamic(() => import('../QuickView/QuickView'));

type ProductsProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  type: string;
  fetchLimit?: number;
  loadMore?: boolean;
};
export const Products: React.FC<ProductsProps> = ({
  deviceType,
  type,
  fetchLimit = 8,
  loadMore = true,
}) => {
  const router = useRouter();
  const [loadingMore, toggleLoading] = useState(false);
  const { state, dispatch: searchDispatch } = useContext(SearchContext);

  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector(state => state.productReducer);

  useEffect(() => {
    dispatch(getProducts(state));
  }, [state.category, state.search]);

  // Quick View Modal
  const handleModalClose = () => {
    const href = `${router.pathname}`;
    const as = '/';
    router.push(href, as, { shallow: true });
    closeModal();
  };

  const handleQuickViewModal = React.useCallback(
    (modalProps: any, deviceType: any, onModalClose: any) => {
      if (router.pathname === '/product/[slug]') {
        const as = `/product/${modalProps.title}`;
        router.push(router.pathname, as);
        return;
      }
      openModal({
        show: true,
        overlayClassName: 'quick-view-overlay',
        closeOnClickOutside: true,
        component: QuickView,
        componentProps: { modalProps, deviceType, onModalClose },
        closeComponent: 'div',
        config: {
          enableResizing: false,
          disableDragging: true,
          className: 'quick-view-modal',
          width: 900,
          y: 30,
          height: 'auto',
          transition: {
            mass: 1,
            tension: 0,
            friction: 0,
          },
        },
      });
      const href = `${router.pathname}?${modalProps.title}`;
      const as = `/product/${modalProps.title}`;
      router.push(href, as, { shallow: true });
    },
    []
  );

  if (loading) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <Placeholder />
        </LoaderItem>
        <LoaderItem>
          <Placeholder />
        </LoaderItem>
        <LoaderItem>
          <Placeholder />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  // if (error) return <div>{error.message}</div>;
  if (!data || !data.items || data.items.length === 0) {
    return <NoResultFound />;
  }

  const handleLoadMore = () => {
    toggleLoading(true);

    const payload: ProductQuery = {
      ...state,
      page: state.page + 1,
    };

    searchDispatch({
      type: 'UPDATE',
      payload,
    });

    dispatch(getMore(payload));

    toggleLoading(false);
  };

  return (
    <>
      {loading && <InlineLoader />}

      <ProductsRow>
        {data.items.map((item: Product, index: number) => (
          <ProductsCol key={index}>
            <ProductCardWrapper>
              <Fade
                duration={800}
                delay={index * 10}
                style={{ height: '100%' }}
              >
                <ProductCard
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  weight={item.unit}
                  currency={CURRENCY}
                  price={item.price}
                  salePrice={item.salePrice}
                  discountInPercent={item.discountInPercent}
                  data={item}
                  deviceType={deviceType}
                  onClick={() =>
                    handleQuickViewModal(item, deviceType, handleModalClose)
                  }
                />
              </Fade>
            </ProductCardWrapper>
          </ProductsCol>
        ))}
      </ProductsRow>
      {data.hasMore && (
        <ButtonWrapper>
          <Button
            onClick={handleLoadMore}
            title='Load More'
            intlButtonId='loadMoreBtn'
            size='small'
            isLoading={loadingMore}
            loader={<Loader color='#009E7F' />}
            style={{
              minWidth: 135,
              backgroundColor: '#ffffff',
              border: '1px solid #f1f1f1',
              color: '#009E7F',
            }}
          />
        </ButtonWrapper>
      )}
    </>
  );
};
export default Products;
