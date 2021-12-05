import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'baseui';
import { Button } from 'baseui/button';
import {
  Grid,
  Row as Rows,
  Col as Column,
} from '../../components/FlexBox/FlexBox';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import { Header, Heading } from '../../components/WrapperStyle';
import Fade from 'react-reveal/Fade';
import ProductCard from '../../components/ProductCard/ProductCard';
import NoResult from '../../components/NoResult/NoResult';
import { CURRENCY } from '../../settings/constants';
import Placeholder from '../../components/Placeholder/Placeholder';
import { Plus } from '../../components/AllSvgIcon';
import { useDrawerDispatch } from '../../context/DrawerContext';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';
import { getMore, getProducts, ProductQuery } from '../../redux/product/productReducer';
import { getCategories } from '../../redux/category/categoryReducer';
import InlineLoader from '../../components/InlineLoader';

export const ProductsRow = styled('div', ({ $theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '25px',
  backgroundColor: $theme.colors.backgroundF7,
  position: 'relative',
  zIndex: '1',

  '@media only screen and (max-width: 767px)': {
    marginLeft: '-7.5px',
    marginRight: '-7.5px',
    marginTop: '15px',
  },
}));

export const Col = styled(Column, () => ({
  '@media only screen and (max-width: 767px)': {
    marginBottom: '20px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

const Row = styled(Rows, () => ({
  '@media only screen and (min-width: 768px) and (max-width: 991px)': {
    alignItems: 'center',
  },
}));

export const ProductCardWrapper = styled('div', () => ({
  height: '100%',
}));

export const LoaderWrapper = styled('div', () => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexWrap: 'wrap',
}));

export const LoaderItem = styled('div', () => ({
  width: '25%',
  padding: '0 15px',
  marginBottom: '30px',
}));

export default function Products() {
  const [query, setQuery] = useState({ page: 1 } as ProductQuery);
  const [type, setType] = useState([] as string[]);

  const dispatch = useDrawerDispatch();

  const { data, loading } = useAppSelector(state => state.productReducer);
  const { categories } = useAppSelector(state => state.categoryReducer);
  const reduxDispatch = useAppDispatch();

  const openDrawer = useCallback(
    () => dispatch({ type: "OPEN_DRAWER", drawerComponent: "PRODUCT_FORM" }),
    [dispatch]
  );

  useEffect(() => {
    reduxDispatch(getCategories());
    reduxDispatch(getProducts(query));
  }, [query, reduxDispatch]);

  const typeSelectOptions = categories.map(c => ({
    value: c.name,
    label: c.name,
  }));

  function loadMore() {
    const nextpage = query.page + 1;

    setQuery({
      ...query,
      page: nextpage,
    });
  }

  function handleCategoryType({ value }) {
    setType(value);

    if (value.length > 0) {
      setQuery({
        ...query,
        page: 1,
        category: value[0].value
      });
    } else {
      setQuery({
        ...query,
        page: 1,
        category: undefined,
      });
    }
  }

  function handleSearch(event) {
    const search = event.currentTarget.value;
    setQuery({
      ...query,
      page: 1,
      search
    });
  }

  return (
    <Grid fluid={true}>
      {(loading || !data) && (<InlineLoader />)}

      <Row>
        <Col md={12}>
          <Header style={{ marginBottom: 15 }}>
            <Col md={2} xs={12}>
              <Heading>Products</Heading>
            </Col>

            <Col md={10} xs={12}>
              <Row>
                <Col md={3} xs={12}>
                  <Select
                    options={typeSelectOptions}
                    labelKey='label'
                    valueKey='value'
                    placeholder='Category Type'
                    value={type}
                    searchable={false}
                    onChange={handleCategoryType}
                  />
                </Col>

                {/* <Col md={2} xs={12}>
                  <Select
                    options={priceSelectOptions}
                    labelKey='label'
                    valueKey='value'
                    value={priceOrder}
                    placeholder='Price'
                    searchable={false}
                    onChange={handlePriceSort}
                  />
                </Col> */}

                <Col md={6} xs={12}>
                  <Input
                    value={query.search}
                    placeholder='Ex: Search By Name'
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={3} xs={6}>
                  <Button
                    onClick={openDrawer}
                    startEnhancer={() => <Plus />}
                    overrides={{
                      BaseButton: {
                        style: () => ({
                          width: '100%',
                          borderTopLeftRadius: '3px',
                          borderTopRightRadius: '3px',
                          borderBottomLeftRadius: '3px',
                          borderBottomRightRadius: '3px',
                        }),
                      },
                    }}
                  >
                    Add Product
                  </Button>
                </Col>

              </Row>
            </Col>
          </Header>

          <Row>
            {data ? (
              data.items && data.items.length !== 0 ? (
                data.items.map((item, index: number) => (
                  <Col
                    md={4}
                    lg={3}
                    sm={6}
                    xs={12}
                    key={index}
                    style={{ margin: '15px 0' }}
                  >
                    <Fade bottom duration={800} delay={index * 10}>
                      <ProductCard
                        title={item.title}
                        weight={item.unit}
                        image={item.image}
                        currency={CURRENCY}
                        price={item.price}
                        salePrice={item.salePrice}
                        discountInPercent={item.discountInPercent}
                        data={item}
                      />
                    </Fade>
                  </Col>
                ))
              ) : (
                <NoResult />
              )
            ) : (
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
                <LoaderItem>
                  <Placeholder />
                </LoaderItem>
              </LoaderWrapper>
            )}
          </Row>
          {data && data.items && data.hasMore && (
            <Row>
              <Col
                md={12}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button onClick={loadMore}>Load More</Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Grid>
  );
}
