import { useState } from "react";
import { Coupon, CouponDiscountType } from "../../types";

interface Props {
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const useCouponManager = ({ onCouponAdd }: Props) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };

  const handleCouponNameUpdate = (newName: string) => {
    setNewCoupon({ ...newCoupon, name: newName });
  };

  const handleCouponCodeUpdate = (newCode: string) => {
    setNewCoupon({ ...newCoupon, code: newCode });
  };

  const handleCouponDiscountTypeUpdate = (
    newDiscountType: CouponDiscountType
  ) => {
    setNewCoupon({ ...newCoupon, discountType: newDiscountType });
  };

  const handleCouponDiscountValueUpdate = (newDiscountValue: number) => {
    setNewCoupon({ ...newCoupon, discountValue: newDiscountValue });
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
