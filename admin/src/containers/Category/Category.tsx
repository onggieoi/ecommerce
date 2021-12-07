/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { withStyle } from 'baseui';
import _ from 'lodash';

import {
  Grid,
  Row as Rows,
  Col as Column,
} from '../../components/FlexBox/FlexBox';
import { useDrawerDispatch } from '../../context/DrawerContext';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/CheckBox/CheckBox';
import { Wrapper, Header, Heading } from '../../components/WrapperStyle';
import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
  ImageWrapper,
} from './Category.style';

import NoResult from '../../components/NoResult/NoResult';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';
import { deleteCategories, getCategories, setCategories } from '../../redux/category/categoryReducer';
import { Category as CategoryModel } from '../../models/category';
import { Minus, Plus } from '../../components/AllSvgIcon';
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


export default function Category() {
  const [search, setSearch] = useState('');
  const dispatch = useDrawerDispatch();
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);
  const openDrawer = useCallback(
    () => dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'CATEGORY_FORM' }),
    [dispatch]
  );

  const openUpdateDrawer = useCallback((category: CategoryModel) =>
    dispatch({
      type: 'OPEN_DRAWER',
      drawerComponent: 'CATEGORY_UPDATE_FORM',
      data: category,
    }),
    [dispatch]
  );

  const { categories, loading } = useAppSelector(state => state.categoryReducer);
  const reduxDispatch = useAppDispatch();

  useEffect(() => {
    if (isEmptyOrUndefine(search)) {
      getCategoryDispatch();
    } else {
      const newCategories = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
      reduxDispatch(setCategories(newCategories));
    }
  }, [search]);

  function handleSearch(event) {
    const value = event.currentTarget.value;
    setSearch(value);


  }

  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = categories && categories.map(category => category.id);
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

    reduxDispatch(deleteCategories({
      request: checkedId,
      callback: getCategoryDispatch,
    }));
  };

  const getCategoryDispatch = () => {
    reduxDispatch(getCategories());
  };

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
              <Heading>Category</Heading>
            </Col>

            <Col md={10}>
              <Row>
                <Col md={5} lg={6}>
                  <Input
                    value={search}
                    placeholder='Ex: Search By Name'
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={4} lg={3}>
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
                    Add Category
                  </Button>
                </Col>

                {checkedId.length > 0 && (
                  <Col md={4} lg={3}>
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
              <StyledTable $gridTemplateColumns='minmax(70px, 70px) auto minmax(120px, 120px)'>
                <StyledHeadCell>
                  <Checkbox
                    type='checkbox'
                    value='checkAll'
                    checked={checked}
                    onChange={onAllCheck}
                  />
                </StyledHeadCell>
                <StyledHeadCell>Name</StyledHeadCell>
                <StyledHeadCell>Products</StyledHeadCell>

                {categories ? (
                  categories.length ? (
                    categories
                      .map(item => (
                        <React.Fragment key={item.id}>
                          <StyledCell>
                            <Checkbox
                              name={item.id}
                              checked={checkedId.includes(item.id)}
                              onChange={handleCheckbox}
                            />
                          </StyledCell>
                          <StyledCell
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
                          >
                            {item.name}
                          </StyledCell>
                          <StyledCell>
                            {item.productTotal}
                          </StyledCell>
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
    </Grid >
  );
}
