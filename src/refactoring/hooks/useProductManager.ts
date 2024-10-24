import { useState } from "react";
import { Discount, Product } from "../../types";

interface Props {
  onProductUpdate: (updatedProduct: Product) => void;
}

const initialDiscount = { quantity: 0, rate: 0 };

export const useProductManager = ({ onProductUpdate }: Props) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>(initialDiscount);

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

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleProductNameUpdate = (productId: string, newName: string) => {
    handleProductUpdate(productId, "name", newName);
  };

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (newPrice < 0) return console.error("price cannot be navigate");
    handleProductUpdate(productId, "price", newPrice);
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    if (newStock < 0) return console.error("stock cannot be navigate");
    handleProductUpdate(productId, "stock", newStock);
  };

  const updateProduct = (product: Product) => {
    onProductUpdate(product);
    if (product.id === editingProduct?.id) {
      setEditingProduct(product);
    }
  };

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

  const handleRemoveDiscount = (index: number) => {
    if (editingProduct) {
      const updatedProduct = {
        ...editingProduct,
        discounts: editingProduct.discounts.filter((_, i) => i !== index),
      };
      updateProduct(updatedProduct);
    }
  };

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleDiscountQuantityUpdate = (newQuantity: number) => {
    if (newQuantity > 0) {
      setNewDiscount({ ...newDiscount, quantity: newQuantity });
    }
  };

  const handleDiscountRateUpdate = (newRate: number) => {
    setNewDiscount({ ...newDiscount, rate: newRate / 100 });
  };

  return {
    editingProduct,
    handleEditProduct,
    handleProductNameUpdate,
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
