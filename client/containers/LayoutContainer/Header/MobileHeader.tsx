import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { openModal, closeModal } from '@redq/reuse-modal';
import { DrawerProvider } from 'contexts/drawer/drawer.provider';
import Popover from 'components/Popover/Popover';
import MobileDrawer from './MobileDrawer';
import {
  MobileHeaderWrapper,
  MobileHeaderInnerWrapper,
  DrawerWrapper,
  LogoWrapper,
  SearchWrapper,
  SearchModalWrapper,
  SearchModalClose,
  Logo,
  SelectedLang,
  LanguageItem,
  LangSwithcer,
  Flag,
} from './Header.style';
import { FormattedMessage } from 'react-intl';
import SearchBox from 'components/SearchBox/SearchBox';
import { SearchContext } from 'contexts/search/search.context';
import Logoimage from 'image/logo.svg';
import {
  HOME_PAGE,
  GROCERY_PAGE,
  MAKEUP_PAGE,
  CLOTHING,
  BAGS_PAGE,
  FURNITURE_PAGE,
  BOOK_PAGE,
} from 'constants/navigation';
import LanguageContext from 'contexts/language/language.context';

import {
  SearchIcon,
  LongArrowLeft,
  DEFlag,
  CNFlag,
  USFlag,
  ILFlag,
  ESFlag,
  SAFlag,
} from 'components/AllSvgIcon';

type MobileHeaderProps = {
  className?: string;
  pathname?: string;
  closeSearch?: any;
};
type SearchModalProps = {
  state?: any;
  handleSearch?: any;
  pathname?: string;
};

const LanguageArray = [
  { id: 'ar', label: 'Arabic', intlLangName: 'intlArabic', icon: <SAFlag /> },
  { id: 'zh', label: 'Chinese', intlLangName: 'intlChinese', icon: <CNFlag /> },
  { id: 'en', label: 'English', intlLangName: 'intlEnglish', icon: <USFlag /> },
  { id: 'de', label: 'German', intlLangName: 'intlGerman', icon: <DEFlag /> },
  { id: 'he', label: 'Hebrew', intlLangName: 'intlHebrew', icon: <ILFlag /> },
  { id: 'es', label: 'Spanish', intlLangName: 'intlSpanish', icon: <ESFlag /> },
  { id: 'vi', label: 'Vietname', intlLangName: 'intlVietname', icon: <USFlag /> },
];

const SearchModal: React.FC<SearchModalProps> = ({
  state,
  pathname,
  handleSearch,
}) => {
  const router = useRouter();
  const [text, setText] = useState(state.text || '');
  const handleSearchInput = (text: string) => {
    setText(text);
  };
  const { page, ...urlState } = state;

  const handleClickSearchButton = () => {
    handleSearch(text);
    router.push({
      pathname: pathname === '/' ? '/grocery' : pathname,
      query: {
        ...urlState,
        text,
      },
    });
    closeModal();
  };
  return (
    <SearchModalWrapper>
      <SearchModalClose type='submit' onClick={() => closeModal()}>
        <LongArrowLeft />
      </SearchModalClose>
      <SearchBox
        className='header-modal-search'
        bordered={false}
        inputStyle={{ height: 35 }}
        buttonText=''
        placeholder='Search'
        handleSearch={handleSearchInput}
        value={text}
        onClick={handleClickSearchButton}
      />
    </SearchModalWrapper>
  );
};

const MobileHeader: React.FC<MobileHeaderProps> = props => {
  const {
    state: { lang },
    toggleLanguage,
  } = useContext<any>(LanguageContext);

  const { state, dispatch } = useContext(SearchContext);
  const { className, pathname, closeSearch } = props;

  const selectedLangindex = LanguageArray.findIndex(x => x.id === lang) ?? 2;


  const handleSearch = (text: string) => {
    dispatch({
      type: 'UPDATE',
      payload: {
        ...state,
        text,
      },
    });
  };
  const handleSearchModal = () => {
    openModal({
      show: true,
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'search-modal-mobile',
        width: '100%',
        height: '100%',
      },
      closeOnClickOutside: false,
      component: SearchModal,
      componentProps: { state, pathname, handleSearch },
      closeComponent: () => <div />,
    });
  };

  const handleToggleLanguage = e => {
    toggleLanguage(e.target.value);
    console.log(e.target.value, 'switcher');
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

  const isHomePage =
    pathname === HOME_PAGE ||
    pathname === GROCERY_PAGE ||
    pathname === CLOTHING ||
    pathname === MAKEUP_PAGE ||
    pathname === BOOK_PAGE ||
    pathname === FURNITURE_PAGE ||
    pathname === BAGS_PAGE;

  return (
    <DrawerProvider>
      <MobileHeaderWrapper>
        <MobileHeaderInnerWrapper className={className}>
          <DrawerWrapper>
            <MobileDrawer />
          </DrawerWrapper>

          <LogoWrapper>
            <Logo>
              <Link href={HOME_PAGE}>
                <a>
                  <img src={Logoimage} alt='snkr-admin' />
                </a>
              </Link>
            </Logo>
          </LogoWrapper>

          <LangSwithcer>
            <Popover
              className='right'
              handler={
                <SelectedLang>
                  <Flag style={{ margin: 0 }}>
                    {LanguageArray[selectedLangindex].icon}
                  </Flag>
                </SelectedLang>
              }
              content={<>{LanguageArray.map(LanguageMenu)}</>}
            />
          </LangSwithcer>

          {isHomePage ? (
            <SearchWrapper
              onClick={handleSearchModal}
              className='searchIconWrapper'
            >
              <SearchIcon />
            </SearchWrapper>
          ) : null}
        </MobileHeaderInnerWrapper>
      </MobileHeaderWrapper>
    </DrawerProvider>
  );
};

export default MobileHeader;
