import React, { useEffect, useState } from 'react';
import { withStyle } from 'baseui';
import Moment from 'react-moment';
import {
  Grid,
  Row as Rows,
  Col as Column,
} from '../../components/FlexBox/FlexBox';
import Input from '../../components/Input/Input';

import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import Checkbox from '../../components/CheckBox/CheckBox';

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
} from './Orders.style';
import NoResult from '../../components/NoResult/NoResult';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';
import { getOrders } from '../../redux/order/orderReducer';
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

export default function Orders() {
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);

  const [search, setSearch] = useState([]);

  const { orders, loading } = useAppSelector(state => state.orderReducer);
  const reduxDispatch = useAppDispatch();

  useEffect(() => {
    reduxDispatch(getOrders());
  }, [reduxDispatch]);
  function handleSearch(event) {
    const { value } = event.currentTarget;
    setSearch(value);
  }

  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = orders && orders.map(order => order.id);
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
  return (
    <Grid fluid={true}>
      {loading && <InlineLoader />}

      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 30,
              boxShadow: '0 0 8px rgba(0, 0 ,0, 0.1)',
            }}
          >
            <Col md={3} xs={12}>
              <Heading>Orders</Heading>
            </Col>

            <Col md={9} xs={12}>
              <Row>
                <Input
                  value={search}
                  placeholder='Ex: Search By Address'
                  onChange={handleSearch}
                  clearable
                />
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns='minmax(70px, 70px) minmax(70px, auto) minmax(100px, 100px) minmax(150px, auto) minmax(70px, auto) minmax(150px, auto) minmax(150px, auto)'>
                <StyledHeadCell>
                  <Checkbox
                    type='checkbox'
                    value='checkAll'
                    checked={checked}
                    onChange={onAllCheck}
                  />
                </StyledHeadCell>
                <StyledHeadCell>Customer</StyledHeadCell>
                <StyledHeadCell>Time</StyledHeadCell>
                <StyledHeadCell>Delivery Address</StyledHeadCell>
                <StyledHeadCell>Amount</StyledHeadCell>
                <StyledHeadCell>Payment Method</StyledHeadCell>
                <StyledHeadCell>Contact</StyledHeadCell>
                {/* <StyledHeadCell>Status</StyledHeadCell> */}

                {orders ? (
                  orders.length ? (
                    orders
                      .map(item => (
                        <React.Fragment key={item.id}>
                          <StyledCell>
                            <Checkbox
                              name={item.id}
                              checked={checkedId.includes(item.id)}
                              onChange={handleCheckbox}
                            />
                          </StyledCell>
                          <StyledCell>{item.user && item.user.name}</StyledCell>
                          <StyledCell>
                            <Moment format='DD/MM/YYYY'>{item.createAt}</Moment>
                          </StyledCell>
                          <StyledCell>{item.address && item.address.info}</StyledCell>
                          <StyledCell>${item.totalPrice}</StyledCell>
                          <StyledCell>{item.card && <>{item.card.name} - {item.card.cardType}: **** **** **** {item.card.lastFourDigit}</>}</StyledCell>
                          <StyledCell>{item.contact && item.contact.number}</StyledCell>
                          {/* <StyledCell style={{ justifyContent: 'center' }}>
                            <Status
                              className={
                                row[7].toLowerCase() === 'delivered'
                                  ? sent
                                  : row[7].toLowerCase() === 'pending'
                                    ? paid
                                    : row[7].toLowerCase() === 'processing'
                                      ? processing
                                      : row[7].toLowerCase() === 'failed'
                                        ? failed
                                        : ''
                              }
                            >
                              {row[7]}
                            </Status>
                          </StyledCell> */}
                        </React.Fragment>
                      ))
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
