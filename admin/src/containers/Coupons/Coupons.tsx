/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { withStyle, } from 'baseui';
import {
  Grid,
  Row as Rows,
  Col as Column,
} from '../../components/FlexBox/FlexBox';
import { useDrawerDispatch } from '../../context/DrawerContext';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import { Minus, Plus } from '../../components/AllSvgIcon';
import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import Checkbox from '../../components/CheckBox/CheckBox';

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
} from './Coupon.style';
import NoResult from '../../components/NoResult/NoResult';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';
import { deleteCoupons, getCoupons } from '../../redux/coupon/couponReducer';
import { Coupon } from '../../models/order';
import { notification } from '../../helpers';
import InlineLoader from '../../components/InlineLoader';

const Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 767px)': {
    marginBottom: '20px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  '@media only screen and (min-width: 768px)': {
    alignItems: 'center',
  },
}));

export default function Coupons() {
  const dispatch = useDrawerDispatch();
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);

  const openDrawer = useCallback(
    () => dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'CAMPAING_FORM' }),
    [dispatch]
  );

  const openUpdateDrawer = useCallback((coupon: Coupon) =>
    dispatch({
      type: 'OPEN_DRAWER',
      drawerComponent: 'CAMPAING_UPDATE_FORM',
      data: coupon,
    }),
    [dispatch]
  );

  const [search, setSearch] = useState('');

  const { coupons, loading } = useAppSelector(state => state.couponReducer);
  const reduxDispatch = useAppDispatch();

  useEffect(() => {
    getCouponsDispatch();
  }, [reduxDispatch]);

  const getCouponsDispatch = () => {
    reduxDispatch(getCoupons());
  }

  function handleSearch(event) {
    const value = event.currentTarget.value;

    setSearch(value);
  }

  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = coupons && coupons.map(coupon => coupon.id);
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.target.checked);
  }

  function handleCheckbox(event) {
    const { name } = event.currentTarget;
    if (!checkedId.includes(name)) {
      setCheckedId(prevState => [...prevState, name]);
    } else {
      setCheckedId(prevState => prevState.filter(id => id !== name));
    }
  }

  const handleRemove = (e) => {
    e.preventDefault();

    reduxDispatch(deleteCoupons({
      request: checkedId,
      callback: callback,
    }));
  };

  const callback = (isSuccessFul: boolean, message: string) => {
    if (isSuccessFul) {
      notification('success', message);
      getCouponsDispatch();
    } else {
      notification('error', message);
    }
  }

  return (
    <Grid fluid={true}>
      {loading && <InlineLoader />}

      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 30,
              boxShadow: '0 0 5px rgba(0, 0 ,0, 0.05)',
            }}
          >
            <Col md={2}>
              <Heading>Coupons</Heading>
            </Col>

            <Col md={10}>
              <Row>
                {/* <Col md={3}>
                  <Select
                    options={statusSelectOptions}
                    labelKey='label'
                    valueKey='value'
                    placeholder='Status'
                    value={status}
                    searchable={false}
                    onChange={handleSelect}
                  />
                </Col> */}

                <Col md={6}>
                  <Input
                    value={search}
                    placeholder='Ex: Search By Name'
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={3}>
                  <Button
                    onClick={openDrawer}
                    startEnhancer={() => <Plus />}
                    overrides={{
                      BaseButton: {
                        style: ({ $theme, $size, $shape }) => {
                          return {
                            width: '100%',
                            borderTopLeftRadius: '3px',
                            borderTopRightRadius: '3px',
                            borderBottomLeftRadius: '3px',
                            borderBottomRightRadius: '3px',
                          };
                        },
                      },
                    }}
                  >
                    Create Coupon
                  </Button>
                </Col>

                {checkedId.length > 0 && (
                  <Col md={3}>
                    <Button
                      onClick={handleRemove}
                      startEnhancer={() => <Minus />}
                      style={{
                        backgroundColor: 'red'
                      }}
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
                      Remove
                    </Button>
                  </Col>)}

              </Row>
            </Col>

          </Header>

          <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns='minmax(70px, 70px) minmax(200px, auto) minmax(200px, auto) minmax(200px, max-content) minmax(150px, auto)'>
                <StyledHeadCell>
                  <Checkbox
                    type='checkbox'
                    value='checkAll'
                    checked={checked}
                    onChange={onAllCheck}
                  />
                </StyledHeadCell>
                <StyledHeadCell>Code</StyledHeadCell>
                <StyledHeadCell>Total Used</StyledHeadCell>
                <StyledHeadCell>Creation Date</StyledHeadCell>
                <StyledHeadCell>Expiration Date</StyledHeadCell>

                {coupons ? (
                  coupons.length ? (
                    coupons.map(item => {
                      return (
                        <React.Fragment key={item.id}>
                          <StyledBodyCell>
                            <Checkbox
                              name={item.id}
                              checked={checkedId.includes(item.id)}
                              onChange={handleCheckbox}
                            />
                          </StyledBodyCell>
                          <StyledBodyCell
                            hover={{
                              'box-shadow': '0 0 5px 5px rgba(0, 0 , 0, 0.05)'
                            }}
                            style={{
                              cursor: 'pointer',
                            }}
                            onClick={e => {
                              e.preventDefault();
                              openUpdateDrawer(item)
                            }}
                          >{item.code}</StyledBodyCell>

                          <StyledBodyCell>{item.totalUsed}</StyledBodyCell>
                          <StyledBodyCell>
                            <Moment format='DD/MM/YYYY'>{item.startDate}</Moment>
                          </StyledBodyCell>
                          <StyledBodyCell>
                            <Moment format='DD/MM/YYYY'>{item.endDate}</Moment>
                          </StyledBodyCell>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <NoResult
                      hideButton={false}
                      style={{
                        gridColumnStart: '1',
                        gridColumnEnd: 'one',
                      }}
                    />
                  )
                ) : null}
              </StyledTable>
            </TableWrapper>
          </Wrapper>
        </Col>
      </Row>
    </Grid>
  );
}
