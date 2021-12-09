import React, { useReducer } from 'react';
import uuidV4 from 'uuid/v4';
import schedules from 'containers/Checkout/data';
import { ProfileContext } from './profile.context';
import { Account } from 'models/account';

type Action =
  | { type: 'HANDLE_ON_INPUT_CHANGE'; payload: any }
  | { type: 'ADD_OR_UPDATE_CONTACT'; payload: any }
  | { type: 'DELETE_CONTACT'; payload: any }
  | { type: 'ADD_OR_UPDATE_ADDRESS'; payload: any }
  | { type: 'DELETE_ADDRESS'; payload: any }
  | { type: 'ADD_CARD'; payload: any }
  | { type: 'DELETE_CARD'; payload: any }
  | { type: 'SET_PRIMARY_CONTACT'; payload: any }
  | { type: 'SET_PRIMARY_ADDRESS'; payload: any }
  | { type: 'SET_PRIMARY_SCHEDULE'; payload: any }
  | { type: 'SET_PRIMARY_CARD'; payload: any };

function reducer(state: Account, action: Action) {
  switch (action.type) {
    case 'HANDLE_ON_INPUT_CHANGE':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'ADD_OR_UPDATE_CONTACT':
      if (action.payload.id) {
        return {
          ...state,
          contacts: state.contacts.map((item: any) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload }
              : item
          ),
        };
      }
      const newContact = {
        ...action.payload,
        id: uuidV4(),
        type: state.contacts.length === 0 ? 'primary' : 'secondary',
      };
      return {
        ...state,
        contacts: [...state.contacts, newContact],
      };

    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          (item: any) => item.id !== action.payload
        ),
      };
    case 'ADD_OR_UPDATE_ADDRESS':
      if (action.payload.id) {
        return {
          ...state,
          addresses: state.addresses.map((item: any) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload }
              : item
          ),
        };
      }
      const newAdress = {
        ...action.payload,
        id: uuidV4(),
        type: state.addresses.length === 0 ? 'primary' : 'secondary',
      };
      return {
        ...state,
        addresses: [...state.addresses, newAdress],
      };
    case 'DELETE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.filter(
          (item: any) => item.id !== action.payload
        ),
      };
    case 'ADD_CARD':
      const newCard = {
        id: uuidV4(),
        type: state.cards.length === 0 ? 'primary' : 'secondary',
        cardType: action.payload.brand.toLowerCase(),
        name: action.payload.name,
        lastFourDigit: action.payload.last4,
      };
      return {
        ...state,
        cards: [newCard, ...state.cards],
      };
    case 'DELETE_CARD':
      return {
        ...state,
        cards: state.cards.filter((item: any) => item.id !== action.payload),
      };
    case 'SET_PRIMARY_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map((item: any) =>
          item.id === action.payload
            ? { ...item, type: 'primary' }
            : { ...item, type: 'secondary' }
        ),
      };
    case 'SET_PRIMARY_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.map((item: any) =>
          item.id === action.payload
            ? { ...item, type: 'primary' }
            : { ...item, type: 'secondary' }
        ),
      };
    case 'SET_PRIMARY_SCHEDULE':
      return {
        ...state,
        schedules: state.schedules.map((item: any) =>
          item.id === action.payload
            ? { ...item, type: 'primary' }
            : { ...item, type: 'secondary' }
        ),
      };
    case 'SET_PRIMARY_CARD':
      return {
        ...state,
        cards: state.cards.map((item: any) =>
          item.id === action.payload
            ? { ...item, type: 'primary' }
            : { ...item, type: 'secondary' }
        ),
      };
    default:
      return state;
  }
}

type ProfileProviderProps = {
  initData: Account;
};

export const ProfileProvider: React.FunctionComponent<ProfileProviderProps> = ({
  children,
  initData,
}) => {
  const [state, dispatch] = useReducer(reducer, { ...initData, schedules });

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
