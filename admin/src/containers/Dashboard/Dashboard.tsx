import React, { useEffect } from 'react';
import { styled } from 'baseui';

import { Grid, Row, Col as Column } from '../../components/FlexBox/FlexBox';
import LineChart from '../../components/Widgets/LineChart/LineChart';
import StickerCard from '../../components/Widgets/StickerCard/StickerCard';
import {
  CoinIcon,
  CartIconBig,
  UserIcon,
} from '../../components/AllSvgIcon';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';
import { getDashboardReport } from '../../redux/report/reportReducer';
import InlineLoader from '../../components/InlineLoader';

const Col = styled(Column, props => ({
  '@media only screen and (max-width: 574px)': {
    marginBottom: '30px',

    ':last-child': {
      marginBottom: 0,
    },
  },

  '@media only screen and (max-width: 990px)': {
    marginBottom: props.className === 'mb-30' ? '30px' : '0',
  },
}));

const Dashboard = () => {
  const { data, loading } = useAppSelector(state => state.reportReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDashboardReport());
  }, [dispatch]);

  if (loading || !data) {
    return (<InlineLoader />)
  }

  return data && (
    <Grid fluid={true}>
      <Row>
        {
          <LineChart
            widgetTitle='Revenue'
            color={['#03D3B5']}
            categories={data.revenueMonths.map(i => i.month)}
            seriesName='Total revenue'
            // series={[4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5]}
            series={data.revenueMonths.map(i => i.revenue)}
          />
        }
      </Row>

      <Row>
        <Col lg={4} sm={4} xs={12} className='mb-30'>
          <StickerCard
            title='Total Revenue'
            subtitle='(Last 30 Days)'
            icon={<CoinIcon />}
            price={`$${data.revenue.total}`}
            indicator={data.revenue.status}
            indicatorText={`Revenue ${data.revenue.status}`}
            note='(previous 30 days)'
            link='#'
          // linkText='Full Details'
          />
        </Col>
        <Col lg={4} sm={4} xs={12} className='mb-30'>
          <StickerCard
            title='Total Order'
            subtitle='(Last 30 Days)'
            icon={<CartIconBig />}
            price={`$${data.order.total}`}
            indicator={data.order.status}
            indicatorText={`Order ${data.order.status}`}
            note='(previous 30 days)'
            link='#'
          // linkText='Full Details'
          />
        </Col>
        <Col lg={4} sm={4} xs={12}>
          <StickerCard
            title='New Customer'
            subtitle='(Last 30 Days)'
            icon={<UserIcon />}
            price={`$${data.customer.total}`}
            indicator={data.customer.status}
            indicatorText={`Customer ${data.customer.status}`}
            note='(previous 30 days)'
            link='#'
          // linkText='Full Details'
          />
        </Col>
      </Row>

      {/* <Row>
          <GraphChart
            widgetTitle='Sales From Social Media'
            colors={['#03D3B5']}
            series={[25, 30, 14, 30, 55, 60, 48]}
            labels={[
              '2019-05-12',
              '2019-05-13',
              '2019-05-14',
              '2019-05-15',
              '2019-05-16',
              '2019-05-17',
              '2019-05-18',
            ]}
          />
      </Row>

      <Row>
        <Col md={12} lg={12}>
          <ColumnChart
            widgetTitle='Sale History'
            colors={['#03D3B5']}
            prefix='$'
            totalValue='1,92,564'
            position='up'
            percentage='1.38%'
            text='More than last year'
            series={[44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65]}
            categories={[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]}
          />
        </Col>
      </Row>

      <Row>
        <Col md={5} lg={4}>
          <GradiantGraphChart
            colors={['#03D3B5']}
            series={[25, 30, 14, 30, 55, 60, 48]}
            labels={[
              '2019-05-12',
              '2019-05-13',
              '2019-05-14',
              '2019-05-15',
              '2019-05-16',
              '2019-05-17',
              '2019-05-18',
            ]}
            topRowTitle='Performance'
            bottomRowData={[
              {
                label: 'Last Week Profit',
                valueText: '+29.7%',
                value: 29.7,
                color: '#03D3B5',
              },
              {
                label: 'This Week Losses',
                valueText: '-53.4%',
                value: 53.4,
                color: '#FC747A',
              },
            ]}
          />
        </Col>

        <Col md={7} lg={8}>
          <MapWidget
            data={[
              {
                name: 'Williamburgs',
                value: 69922,
                color: '#2170FF',
              },
              {
                name: 'Brooklyn',
                value: 41953,
                color: '#29CAE4',
              },
              {
                name: 'New York',
                value: 23307,
                color: '#666D92',
              },
              {
                name: 'Jersey City',
                value: 20200,
                color: '#03D3B5',
              },
            ]}
            totalText='Total Client'
          />
        </Col>
      </Row> */}

    </Grid>
  )
};

export default Dashboard;
