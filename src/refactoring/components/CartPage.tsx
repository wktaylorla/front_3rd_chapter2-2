import { useCallback } from "react";

import { useCart } from "../hooks";

import ProductsList from "./Cart/ProductsList/index.tsx";
import Receipt from "./Cart/Receipt.tsx";
import CartList from "./Cart/CartList.tsx";

import { Coupon, Product } from "../../types.ts";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

const CouponItem = ({ coupon, index }: { coupon: Coupon; index: number }) => {
  return (
    <option key={coupon.code} value={index}>
      {coupon.name} -{" "}
      {coupon.discountType === "amount"
        ? `${coupon.discountValue}원`
        : `${coupon.discountValue}%`}
    </option>
  );
};

const SelectedCoupon = ({ coupon }: { coupon: Coupon }) => {
  const { discountType, discountValue, name } = coupon;

  return (
    <p className="text-green-600">
      적용된 쿠폰: {name}(
      {discountType === "amount" ? `${discountValue}원` : `${discountValue}%`}
      할인)
    </p>
  );
};

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  const getRemainingStock = useCallback(
    (product: Product) => {
      const cartItem = cart.find((item) => item.product.id === product.id);
      return product.stock - (cartItem?.quantity || 0);
    },
    [cart]
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductsList
          products={products}
          addToCart={addToCart}
          getRemainingStock={getRemainingStock}
        />
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>

          <div className="space-y-2">
            <CartList
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
            <select
              onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">쿠폰 선택</option>
              {coupons.map((coupon, index) => (
                <CouponItem
                  key={`coupon-option-${index}`}
                  coupon={coupon}
                  index={index}
                />
              ))}
            </select>
            {selectedCoupon && <SelectedCoupon coupon={selectedCoupon} />}
          </div>

          <Receipt calculatedTotal={calculateTotal()} />
        </div>
      </div>
    </div>
  );
};
