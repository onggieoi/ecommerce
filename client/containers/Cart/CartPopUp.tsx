import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';
import { openModal, closeModal } from '@redq/reuse-modal';
import CartItem from './Cart';
import CartPopupButton, {
  BoxedCartButton,
} from 'components/CartPopup/CartPopupButton';
import { CartContext } from 'contexts/cart/cart.context';
import { CURRENCY } from 'helper/constant';
import { CartSlidePopup } from './CartItemCard.style';
import { FormattedMessage } from 'react-intl';

const CartPopupStyle = createGlobalStyle`
  .cartPopup{
    top: auto !important;
    left: auto !important;
    bottom: 50px !important;
    right: 50px !important;
    box-shadow: 0 21px 36px rgba(0, 0, 0, 0.16);
    transform-origin: bottom right;

    @media (max-width: 767px) {
      max-width: none!important;
      width: 100% !important;
      bottom: 0 !important;
      left: 0!important;
      background: #fff;
      overflow: initial !important;
      transform-origin: bottom center;
    }
  }
`;

type CartProps = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const CartPopUp: React.FC<CartProps> = ({
  deviceType: { mobile, tablet, desktop },
}) => {
  const { cartState, dispatch, products, totalPrice } = useContext(CartContext);

  const handleModal = () => {
    openModal({
      show: true,
      config: {
        className: 'cartPopup',
        width: 'auto',
        height: 'auto',
        enableResizing: false,
        disableDragging: true,
        transition: {
          tension: 360,
          friction: 40,
        },
      },
      closeOnClickOutside: true,
      component: CartItem,
      closeComponent: () => <div />,
      componentProps: { onCloseBtnClick: closeModal, scrollbarHeight: 370 },
    });
  };

  const toggleCart = () => {
    dispatch({
      type: 'TOGGLE',
    });
  };

  let cartSlideclass = cartState.isOpen === true ? 'cartPopupFixed' : '';

  return (
    <>
      {mobile || tablet ? (
        <>
          <CartPopupStyle />
          <CartPopupButton
            className='product-cart'
            itemCount={products.length}
            itemPostfix={
              products.length > 1 ? (
                <FormattedMessage id='cartItems' defaultMessage='items' />
              ) : (
                <FormattedMessage id='cartItem' defaultMessage='item' />
              )
            }
            price={totalPrice}
            pricePrefix='$'
            onClick={handleModal}
          />
        </>
      ) : (
        <>
          <CartSlidePopup className={cartSlideclass}>
            {cartState.isOpen === true && (
              <CartItem onCloseBtnClick={toggleCart} scrollbarHeight='100vh' />
            )}
          </CartSlidePopup>

          <BoxedCartButton
            className='product-cart'
            itemCount={products.length}
            itemPostfix={
              products.length > 1 ? (
                <FormattedMessage id='cartItems' defaultMessage='items' />
              ) : (
                <FormattedMessage id='cartItem' defaultMessage='item' />
              )
            }
            price={totalPrice}
            pricePrefix={CURRENCY}
            onClick={toggleCart}
          />
        </>
      )}
    </>
  );
};

export default CartPopUp;
