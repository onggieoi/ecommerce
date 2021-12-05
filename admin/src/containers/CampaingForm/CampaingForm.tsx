import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useDrawerDispatch, useDrawerState } from '../../context/DrawerContext';
import { Scrollbars } from 'react-custom-scrollbars';
import Input from '../../components/Input/Input';
import Button, { KIND } from '../../components/Button/Button';
import DrawerBox from '../../components/DrawerBox/DrawerBox';
import { Row, Col } from '../../components/FlexBox/FlexBox';
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import { FormFields, FormLabel } from '../../components/FormFields/FormFields';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';
import { getCoupons, upsertCoupon } from '../../redux/coupon/couponReducer';
import moment from 'moment';
import { Coupon } from '../../models/order';
import _ from 'lodash';
import { notification } from '../../helpers';
import InlineLoader from '../../components/InlineLoader';

type Props = any;

const AddCampaing: React.FC<Props> = props => {
  const dispatch = useDrawerDispatch();
  const data: Coupon = useDrawerState('data');
  const isUpdating = !_.isUndefined(data?.id);

  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: data,
  });

  const [dateRange, setDate] = useState({
    startDate: data ? moment(data.startDate).format('yyyy-MM-DD') : moment().format('yyyy-MM-DD'),
    endDate: data ? moment(data.endDate).format('yyyy-MM-DD') : moment().format('yyyy-MM-DD'),
  });

  const { loading } = useAppSelector(state => state.couponReducer);
  const reduxDispatch = useAppDispatch();

  React.useEffect(() => {
    register({ name: 'id' });
  }, [register]);

  const onSubmit = data => {
    reduxDispatch(upsertCoupon({
      request: {
        ...data,
        startDate: moment(dateRange.startDate),
        endDate: moment(dateRange.endDate),
      },
      callback: callback,
    }));
  };

  const callback = (isSuccessFul: boolean, message: string = '') => {
    if (isSuccessFul) {
      reduxDispatch(getCoupons());
      notification('success', isUpdating ? 'Updated ' : 'Created ' + message);
    } else {
      notification('error', message);
    }

    closeDrawer();
  }

  const handleChangeEndDate = (e) => {
    e.preventDefault();
    setDate({ ...dateRange, endDate: e.target.value })
  };

  const handleChangeStartDate = (e) => {
    e.preventDefault();
    setDate({ ...dateRange, startDate: e.target.value })
  };

  return (
    <>
      {loading && <InlineLoader />}

      <DrawerTitleWrapper>
        <DrawerTitle>Add Coupon</DrawerTitle>
      </DrawerTitleWrapper>

      <Form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
        <Scrollbars
          autoHide
          renderView={props => (
            <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
          )}
          renderTrackHorizontal={props => (
            <div
              {...props}
              style={{ display: 'none' }}
              className="track-horizontal"
            />
          )}
        >
          <Row>
            <Col lg={4}>
              <FieldDetails>
                Add your coupon description and necessary informations from here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Discount Code</FormLabel>
                  <Input inputRef={register({ required: true })} name="code" />
                </FormFields>

                <FormFields>
                  <FormLabel>Discount Percent</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="discount"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Start Date</FormLabel>
                  <Input value={dateRange.startDate} onChange={handleChangeStartDate} type="date" />
                </FormFields>

                <FormFields>
                  <FormLabel>End Date</FormLabel>
                  <Input value={dateRange.endDate} onChange={handleChangeEndDate} type="date" />
                </FormFields>

              </DrawerBox>
            </Col>
          </Row>
        </Scrollbars>

        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={closeDrawer}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                  marginRight: '15px',
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                }),
              },
            }}
          >
            {isUpdating ? 'Update' : 'Create'} Coupon
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddCampaing;
