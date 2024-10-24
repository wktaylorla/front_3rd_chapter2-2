import { useState } from "react";

import { Product } from "../../../../types";

interface Props {
  addNewProduct: (product: Product) => void;
}

const INITIAL_NEW_PRODUCT = {
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
};

const NewProductForm = ({ addNewProduct }: Props) => {
  const [newProduct, setNewProduct] =
    useState<Omit<Product, "id">>(INITIAL_NEW_PRODUCT);

  const initializeNewProduct = () => setNewProduct(INITIAL_NEW_PRODUCT);

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    addNewProduct(productWithId);
    initializeNewProduct();
  };

  const handleNewProductName = (newName: string) =>
    setNewProduct({ ...newProduct, name: newName });

  const handleNewProductPrice = (newPrice: number) => {
    if (newPrice <= 0) return console.error("price cannot be negative.");
    setNewProduct({ ...newProduct, price: newPrice });
  };

  const handleNewProductStock = (newStock: number) => {
    if (newStock <= 0) return console.error("stock cannot be negative.");
    setNewProduct({ ...newProduct, stock: newStock });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      <div className="mb-2">
        <label
          htmlFor="productName"
          className="block text-sm font-medium text-gray-700"
        >
          상품명
        </label>
        <input
          id="productName"
          type="text"
          value={newProduct.name}
          onChange={(e) => handleNewProductName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="productPrice"
          className="block text-sm font-medium text-gray-700"
        >
          가격
        </label>
        <input
          id="productPrice"
          type="number"
          value={newProduct.price}
          onChange={(e) => handleNewProductPrice(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="productStock"
          className="block text-sm font-medium text-gray-700"
        >
          재고
        </label>
        <input
          id="productStock"
          type="number"
          value={newProduct.stock}
          onChange={(e) => handleNewProductStock(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleAddNewProduct}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  );
};

export default NewProductForm;
