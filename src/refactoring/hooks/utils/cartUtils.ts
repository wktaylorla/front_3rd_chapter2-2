import { CartItem, Coupon, Product } from "../../../types";

export const calculateItemTotal = (item: CartItem) => {
  const discountRate = getMaxApplicableDiscount(item);
  return item.product.price * item.quantity * (1 - discountRate);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { quantity } = item;

  return item.product.discounts.reduce(
    (maxDiscount, discount) =>
      quantity >= discount.quantity && discount.rate > maxDiscount
        ? discount.rate
        : maxDiscount,
    0
  );
};

const applyCouponDiscount = (total: number, coupon: Coupon | null): number => {
  if (!coupon) return total;
  const { discountType, discountValue } = coupon;

  switch (discountType) {
    case "amount":
      return Math.max(0, total - discountValue);
    case "percentage":
      return total * (1 - discountValue / 100);
    default:
      return total;
  }
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  cart.forEach((item) => {
    const { product, quantity } = item;
    const { price } = product;

    totalBeforeDiscount += price * quantity;
    totalAfterDiscount += calculateItemTotal(item);
  });

  totalAfterDiscount = applyCouponDiscount(totalAfterDiscount, selectedCoupon);
  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  const existingItem = cart.find((item) => item.product.id === productId);

  if (existingItem) {
    return cart
      .map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: Math.min(newQuantity, item.product.stock),
            }
          : item
      )
      .filter((item) => item.quantity > 0);
  }

  return cart;
};

export const getRemainingStock = (cart: CartItem[], product: Product) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

export const getProductMaxDiscount = (
  discounts: { quantity: number; rate: number }[]
) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getAppliedDiscount = (item: CartItem) => {
  const { quantity: itemQuantity, product } = item;
  const { discounts } = product;
  let appliedDiscount = 0;

  for (const discount of discounts) {
    if (itemQuantity >= discount.quantity) {
      appliedDiscount = Math.max(appliedDiscount, discount.rate);
    }
  }

  return appliedDiscount;
};
