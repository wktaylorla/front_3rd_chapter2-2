import { useState } from "react";

import { Discount, Product } from "../../types";

interface Props {
  onProductUpdate: (updatedProduct: Product) => void;
}

const initialDiscount = { quantity: 0, rate: 0 };

export const useProductManager = ({ onProductUpdate }: Props) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>(initialDiscount);

  // editing product의 내용을 업데이트하는 함수
  const handleProductUpdate = <K extends keyof Product>(
    productId: String,
    key: K,
    value: Product[K]
  ) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, [key]: value };
      setEditingProduct(updatedProduct);
    }
  };

  // editing product를 업데이트하는 함수
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // editing product의 name을 업데이트하는 함수
  const handleNameUpdate = (productId: string, newName: string) => {
    handleProductUpdate(productId, "name", newName);
  };

  // editing product의 price를 업데이트하는 함수
  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (newPrice < 0) return console.error("price cannot be navigate");
    handleProductUpdate(productId, "price", newPrice);
  };

  // editing product의 stock을 업데이트하는 함수
  const handleStockUpdate = (productId: string, newStock: number) => {
    if (newStock < 0) return console.error("stock cannot be navigate");
    handleProductUpdate(productId, "stock", newStock);
  };

  // 수정한 프로덕트를 실제 product에 반영하는 함수
  const updateProduct = (product: Product) => {
    onProductUpdate(product);
    if (product.id === editingProduct?.id) {
      setEditingProduct(product);
    }
  };

  // 압력중인 새로운 할인을 editing product에 추가하는 함수 (실제 product에 바로 반영됨))
  const handleAddDiscount = () => {
    if (editingProduct) {
      const updatedProduct = {
        ...editingProduct,
        discounts: [...editingProduct.discounts, newDiscount],
      };
      updateProduct(updatedProduct);
      setNewDiscount(initialDiscount);
    }
  };

  // editing product에서 특정 할인을 제거하는 함수 (실제 product에 바로 반영됨)
  const handleRemoveDiscount = (index: number) => {
    if (editingProduct) {
      const updatedProduct = {
        ...editingProduct,
        discounts: editingProduct.discounts.filter((_, i) => i !== index),
      };
      updateProduct(updatedProduct);
    }
  };

  // 수정중인 product정보 저장
  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  // 할인의 개수제한(quantity)를 업데이트하는 함수
  const handleDiscountQuantityUpdate = (newQuantity: number) => {
    if (newQuantity > 0) {
      setNewDiscount({ ...newDiscount, quantity: newQuantity });
    }
  };

  // 할인의 할인율(rate)를 업데이트하는 함수
  const handleDiscountRateUpdate = (newRate: number) => {
    setNewDiscount({ ...newDiscount, rate: newRate / 100 });
  };

  return {
    editingProduct,
    handleEditProduct,
    handleNameUpdate,
    handlePriceUpdate,
    handleStockUpdate,
    handleAddDiscount,
    handleRemoveDiscount,
    handleEditComplete,
    handleDiscountQuantityUpdate,
    handleDiscountRateUpdate,
    newDiscount,
  };
};
