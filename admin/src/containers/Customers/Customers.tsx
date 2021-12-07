/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { styled, withStyle } from 'baseui';
import {
  Grid,
  Row as Rows,
  Col as Column,
} from '../../components/FlexBox/FlexBox';
import Input from '../../components/Input/Input';
import { Wrapper, Header, Heading } from '../../components/WrapperStyle';

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
} from './Customers.style';
import NoResult from '../../components/NoResult/NoResult';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';
import { getUsers, setUsers } from '../../redux/user/userReducer';
import { Customer } from '../../models/user';
import InlineLoader from '../../components/InlineLoader';
import { isEmptyOrUndefine } from '../../helpers';

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


export default function Customers() {
  const [search, setSearch] = useState('');

  const { loading, users } = useAppSelector(state => state.userReducer);
  const reduxDispatch = useAppDispatch();

  useEffect(() => {
    if (isEmptyOrUndefine(search)) {
      reduxDispatch(getUsers());
    } else {
      const newUsers = users.filter(c => c.name.toLowerCase().includes((search.toString()).toLowerCase()));
      reduxDispatch(setUsers(newUsers));
    }
  }, [search]);

  function handleSearch(event) {
    const value = event.currentTarget.value;
    setSearch(value);
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
            <Col md={3}>
              <Heading>Customers</Heading>
            </Col>

            <Col md={9}>
              <Row>
                <Input
                  value={search}
                  placeholder='Ex: Search By Name'
                  onChange={handleSearch}
                  clearable
                />
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns='minmax(150px, auto) minmax(150px, auto) minmax(150px, 150px) minmax(150px, 150px) minmax(150px, 150px)'>
                <StyledHeadCell>Name</StyledHeadCell>
                <StyledHeadCell>Contacts</StyledHeadCell>
                <StyledHeadCell>Total Order</StyledHeadCell>
                <StyledHeadCell>Total Amount</StyledHeadCell>
                <StyledHeadCell>Joining Date</StyledHeadCell>

                {users ? (
                  users.length ? (
                    users
                      .map((item: Customer) => (
                        <React.Fragment key={item.id}>
                          <StyledBodyCell>{item.name}</StyledBodyCell>
                          <StyledBodyCell>{item.contacts.find(c => c.type === 'primary').number}</StyledBodyCell>
                          <StyledBodyCell>{item.totalOrder}</StyledBodyCell>
                          <StyledBodyCell>${item.totalAmount}</StyledBodyCell>
                          <StyledBodyCell>
                            <Moment format='DD/MM/YYYY'>{item.createAt}</Moment>
                          </StyledBodyCell>
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
