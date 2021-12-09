
export const endpoints = {
  products: 'products',
  productDetail: (title: string) => `products/${title}`,

  categories: 'categories',

  order: 'orders',
  getOrderDetail: (id: string) => `orders/${id}`,

  user: 'users',
  login: 'users/token',
  me: 'users/me',

  coupon: 'coupons',
  couponCode: (code: string) => `coupons/${code}`,
}