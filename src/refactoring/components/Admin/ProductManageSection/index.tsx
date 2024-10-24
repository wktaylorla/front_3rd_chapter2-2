import { useState } from "react";

import { useAccordion, useProductManager } from "../../../hooks";

import NewProductForm from "./NewProductForm";

import { Product } from "../../../../types";

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

const ProductManageSection = ({
  products,
  onProductUpdate,
  onProductAdd,
}: Props) => {
  const { openProductIds, toggleProductAccordion } = useAccordion();
  const {
    editingProduct,
    handleEditProduct,
    handleNameUpdate,
    handlePriceUpdate,
    handleStockUpdate,
    handleAddDiscount,
    handleRemoveDiscount,
    handleEditComplete,
    newDiscount,
    handleDiscountQuantityUpdate,
    handleDiscountRateUpdate,
  } = useProductManager({ onProductUpdate });

  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const addNewProduct = (product: Product) => {
    onProductAdd(product);
    setShowNewProductForm(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && <NewProductForm addNewProduct={addNewProduct} />}
      <div className="space-y-2">
        {products.map((product, index) => {
          const { id, name, price, stock } = product;
          const isOpen = openProductIds.has(id);
          const isEditing = editingProduct && editingProduct.id === id;

          return (
            <div
              key={id}
              data-testid={`product-${index + 1}`}
              className="bg-white p-4 rounded shadow"
            >
              <button
                data-testid="toggle-button"
                onClick={() => toggleProductAccordion(id)}
                className="w-full text-left font-semibold"
              >
                {name} - {price}원 (재고: {stock})
              </button>
              {isOpen && (
                <div className="mt-2">
                  {isEditing ? (
                    <div>
                      <div className="mb-4">
                        <label className="block mb-1">상품명: </label>
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) =>
                            handleNameUpdate(product.id, e.target.value)
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1">가격: </label>
                        <input
                          type="number"
                          value={editingProduct.price}
                          onChange={(e) =>
                            handlePriceUpdate(
                              product.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-1">재고: </label>
                        <input
                          type="number"
                          value={editingProduct.stock}
                          onChange={(e) =>
                            handleStockUpdate(
                              product.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      {/* 할인 정보 수정 부분 */}
                      <div>
                        <h4 className="text-lg font-semibold mb-2">
                          할인 정보
                        </h4>
                        {editingProduct.discounts.map((discount, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center mb-2"
                          >
                            <span>
                              {discount.quantity}개 이상 구매 시{" "}
                              {discount.rate * 100}% 할인
                            </span>
                            <button
                              onClick={() => handleRemoveDiscount(index)}
                              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                              삭제
                            </button>
                          </div>
                        ))}
                        <div className="flex space-x-2">
                          <input
                            type="number"
                            placeholder="수량"
                            value={newDiscount.quantity}
                            onChange={(e) =>
                              handleDiscountQuantityUpdate(
                                parseInt(e.target.value)
                              )
                            }
                            className="w-1/3 p-2 border rounded"
                          />
                          <input
                            type="number"
                            placeholder="할인율 (%)"
                            value={newDiscount.rate * 100}
                            onChange={(e) =>
                              handleDiscountRateUpdate(parseInt(e.target.value))
                            }
                            className="w-1/3 p-2 border rounded"
                          />
                          <button
                            onClick={handleAddDiscount}
                            className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                          >
                            할인 추가
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={handleEditComplete}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
                      >
                        수정 완료
                      </button>
                    </div>
                  ) : (
                    <div>
                      {product.discounts.map((discount, index) => (
                        <div key={index} className="mb-2">
                          <span>
                            {discount.quantity}개 이상 구매 시{" "}
                            {discount.rate * 100}% 할인
                          </span>
                        </div>
                      ))}
                      <button
                        data-testid="modify-button"
                        onClick={() => handleEditProduct(product)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
                      >
                        수정
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductManageSection;
