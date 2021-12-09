import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { openModal } from '@redq/reuse-modal';
import NavLink from 'components/NavLink/NavLink';
import Popover from 'components/Popover/Popover';
import SearchBox from 'components/SearchBox/SearchBox';
import { SearchContext } from 'contexts/search/search.context';
import { AuthContext } from 'contexts/auth/auth.context';
import AuthenticationForm from '../../SignInOutForm/Form';
import { FormattedMessage } from 'react-intl';
import Button from 'components/Button/Button';
import LanguageContext from 'contexts/language/language.context';

import {
  FruitsVegetable,
  MenuDown,
  FacialCare,
  DressIcon,
  Handbag,
  HelpIcon,
  BookIcon,
  FurnitureIcon,
  DEFlag,
  CNFlag,
  USFlag,
  ILFlag,
  ESFlag,
  SAFlag,
  VNFlag,
} from 'components/AllSvgIcon';

import HeaderWrapper, {
  HeaderLeftSide,
  HeaderRightSide,
  Logo,
  MainMenu,
  SelectedType,
  DropDownArrow,
  SelectedLang,
  LanguageItem,
  LangSwithcer,
  Flag,
  TypeIcon,
} from './Header.style';

const Logoimage = '/image/logo.svg';
const UserImage = '/image/user.jpg';
import {
  HOME_PAGE,
  GROCERY_PAGE,
  CLOTHING,
  MAKEUP_PAGE,
  BAGS_PAGE,
  FURNITURE_PAGE,
  BOOK_PAGE,
  PROCEED_TO_CHECKOUT_PAGE,
  PROFILE_PAGE,
  ORDER_RECEIVED,
  YOUR_ORDER,
  OFFER_PAGE,
  HELP_PAGE,
} from 'constants/navigation';
type HeaderProps = {
  style?: any;
  className?: string;
  token: string;
  pathname: string;
};

const MenuArray = [
  {
    link: GROCERY_PAGE,
    icon: <FruitsVegetable />,
    label: 'Grocery',
  },
  {
    link: MAKEUP_PAGE,
    label: 'Makeup',
    icon: <FacialCare />,
  },
  {
    link: BAGS_PAGE,
    label: 'Bags',
    icon: <Handbag />,
  },
  {
    link: CLOTHING,
    label: 'Clothing',
    icon: <DressIcon />,
  },
  {
    link: FURNITURE_PAGE,
    label: 'Furniture',
    icon: <FurnitureIcon width='15px' height='13px' />,
  },
  {
    link: BOOK_PAGE,
    label: 'Book',
    icon: <BookIcon width='15px' height='13px' />,
  },
];

const DropDownMenuArray = [
  {
    link: PROFILE_PAGE,
    label: 'Profile',
    intlId: 'navlinkProfile',
    icon: ''
  },
  {
    link: PROCEED_TO_CHECKOUT_PAGE,
    label: 'Checkout',
    intlId: 'navlinkCheckout',
    icon: ''
  },
  {
    link: YOUR_ORDER,
    label: 'Order',
    intlId: 'sidebarYourOrder',
    icon: ''
  },
  {
    link: ORDER_RECEIVED,
    label: 'Order invoice',
    intlId: 'navlinkOrderReceived',
    icon: ''
  },
];

const LanguageArray = [
  { id: 'ar', label: 'Arabic', intlLangName: 'intlArabic', icon: <SAFlag /> },
  { id: 'zh', label: 'Chinese', intlLangName: 'intlChinese', icon: <CNFlag /> },
  { id: 'en', label: 'English', intlLangName: 'intlEnglish', icon: <USFlag /> },
  { id: 'de', label: 'German', intlLangName: 'intlGerman', icon: <DEFlag /> },
  { id: 'he', label: 'Hebrew', intlLangName: 'intlHebrew', icon: <ILFlag /> },
  { id: 'es', label: 'Spanish', intlLangName: 'intlSpanish', icon: <ESFlag /> },
  { id: 'vi', label: 'Vietname', intlLangName: 'intlVietname', icon: <VNFlag /> },
];

const Header: React.FC<HeaderProps> = ({
  style,
  className,
  token,
  pathname,
}) => {
  const {
    state: { lang },
    toggleLanguage,
  } = useContext<any>(LanguageContext);

  const activeMenuItem = MenuArray.find(item => item.link === pathname);

  const selectedLangindex = LanguageArray.findIndex(x => x.id === lang) ?? 2;

  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext<any>(AuthContext);

  const { state, dispatch } = useContext(SearchContext);

  const [activeMenu, setActiveMenu] = useState(
    activeMenuItem || {
      link: GROCERY_PAGE,
      icon: <FruitsVegetable />,
      label: 'Grocery',
    }
  );

  const { search } = state;

  const handleSearch = (text: any) => {
    dispatch({
      type: 'UPDATE',
      payload: {
        ...state,
        page: 1,
        search: text,
      },
    });
  };

  const { page, ...urlState } = state;
  const handleClickSearchButton = () => {
    Router.push({
      pathname: pathname,
      query: { ...urlState, search },
    });
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      authDispatch({ type: 'SIGN_OUT' });
      Router.push('/');
    }
  };
  const resetSearch = (selectedMenu: any) => {
    setActiveMenu(selectedMenu);
    dispatch({
      type: 'RESET',
    });
  };
  const NavItem = (item: any) => {
    return (
      <NavLink
        key={item.link}
        onClick={() => resetSearch(item)}
        className='menu-item'
        href={item.link}
        label={item.label}
        icon={item.icon}
        iconClass='menu-item-icon'
      />
    );
  };

  const handleToggleLanguage = e => {
    toggleLanguage(e.target.value);
  };

  const LanguageMenu = (item: any) => {
    return (
      <LanguageItem
        onClick={handleToggleLanguage}
        key={item.id}
        value={item.id}
      >
        <span>{item.icon}</span>
        <FormattedMessage id={item.intlLangName} defaultMessage={item.label} />
      </LanguageItem>
    );
  };

  const signInOutForm = () => {
    authDispatch({
      type: 'SIGNIN',
    });

    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 458,
        height: 'auto',
      },
    });
  };

  const isHomePage =
    pathname === HOME_PAGE ||
    pathname === GROCERY_PAGE ||
    pathname === CLOTHING ||
    pathname === MAKEUP_PAGE ||
    pathname === BOOK_PAGE ||
    pathname === FURNITURE_PAGE ||
    pathname === BAGS_PAGE;

  return (
    <HeaderWrapper style={style} className={className}>
      <HeaderLeftSide>
        <Logo
          onClick={() =>
            resetSearch({
              link: GROCERY_PAGE,
              icon: <FruitsVegetable />,
              label: 'Grocery',
            })
          }
        >
          <Link href={HOME_PAGE}>
            <a>
              <img src="/image/snkr.png" alt='snkr-admin' />
            </a>
          </Link>
        </Logo>
        {/* <MainMenu>
          <Popover
            className='right'
            handler={
              <SelectedType>
                <span>
                  <TypeIcon>{activeMenu.icon}</TypeIcon>
                  <span>{activeMenu.label}</span>
                </span>
                <DropDownArrow>
                  <MenuDown />
                </DropDownArrow>
              </SelectedType>
            }
            content={<>{MenuArray.map(NavItem)}</>}
          />
        </MainMenu> */}
      </HeaderLeftSide>
      {isHomePage ? (
        <SearchBox
          className='headerSearch'
          handleSearch={(value: any) => handleSearch(value)}
          onClick={handleClickSearchButton}
          placeholder='Search anything...'
          hideType={true}
          minimal={true}
          showSvg={true}
          style={{ width: '100%' }}
          value={search || ''}
        />
      ) : null}
      <HeaderRightSide>
        <NavLink
          className='menu-item'
          href={OFFER_PAGE}
          label='Offer'
          intlId='navlinkOffer'
        />
        <NavLink
          className='menu-item'
          href={HELP_PAGE}
          label='Need Help'
          intlId='navlinkHelp'
          iconClass='menu-icon'
          icon={<HelpIcon />}
        />

        <LangSwithcer>
          <Popover
            className='right'
            handler={
              <SelectedLang>
                <Flag>{LanguageArray[selectedLangindex].icon}</Flag>
                <span>
                  <FormattedMessage
                    id={LanguageArray[selectedLangindex].intlLangName}
                    defaultMessage={LanguageArray[selectedLangindex].label}
                  />
                </span>
              </SelectedLang>
            }
            content={<>{LanguageArray.map(LanguageMenu)}</>}
          />
        </LangSwithcer>

        {!isAuthenticated ? (
          <Button
            onClick={signInOutForm}
            size='small'
            title='Join'
            style={{ fontSize: 15, color: '#fff' }}
            intlButtonId='joinButton'
          />
        ) : (
          <Popover
            direction='right'
            className='user-pages-dropdown'
            handler={<img src={UserImage} alt='user' />}
            content={
              <>
                {DropDownMenuArray.map((item, idx) => (
                  <NavLink
                    key={idx}
                    className='menu-item'
                    href={item.link}
                    label={item.label}
                    intlId={item.intlId}
                  />
                ))}
                <div className='menu-item' onClick={handleLogout}>
                  <a>
                    <span>
                      <FormattedMessage
                        id='navlinkLogout'
                        defaultMessage='Logout'
                      />
                    </span>
                  </a>
                </div>
              </>
            }
          />
        )}
      </HeaderRightSide>
    </HeaderWrapper>
  );
};

export default Header;
