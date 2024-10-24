import { useState } from "react";

import { Coupon, CouponDiscountType } from "../../types";

interface Props {
  onCouponAdd: (newCoupon: Coupon) => void;
}

const INITIAL_COUPON = {
  name: "",
  code: "",
  discountType: "percentage",
  discountValue: 0,
} as const;

export const useCouponManager = ({ onCouponAdd }: Props) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>(INITIAL_COUPON);

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon(INITIAL_COUPON);
  };

  const handleCouponUpdate = <K extends keyof Coupon>(
    key: K,
    value: Coupon[K]
  ) => {
    setNewCoupon({ ...newCoupon, [key]: value });
  };

  const handleCouponNameUpdate = (newName: string) => {
    handleCouponUpdate("name", newName);
  };

  const handleCouponCodeUpdate = (newCode: string) => {
    handleCouponUpdate("code", newCode);
  };

  const handleCouponDiscountTypeUpdate = (
    newDiscountType: CouponDiscountType
  ) => {
    handleCouponUpdate("discountType", newDiscountType);
  };

  const handleCouponDiscountValueUpdate = (newDiscountValue: number) => {
    handleCouponUpdate("discountValue", newDiscountValue);
  };

  return {
    handleAddCoupon,
    handleCouponNameUpdate,
    handleCouponCodeUpdate,
    handleCouponDiscountTypeUpdate,
    handleCouponDiscountValueUpdate,
    newCoupon,
  };
};
