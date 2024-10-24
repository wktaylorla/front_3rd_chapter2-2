import { getProductMaxDiscount } from "../../../hooks/utils/cartUtils";

import { Product } from "../../../../types";

interface Props {
  product: Product;
  remainingStock: number;
  addToCart: (product: Product) => void;
}

const Name = ({ product }: { product: Product }) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <span className="font-semibold">{product.name}</span>
      <span className="text-gray-600">{product.price.toLocaleString()}원</span>
    </div>
  );
};

const StockAndMaxDiscount = ({
  product,
  remainingStock,
}: {
  product: Product;
  remainingStock: number;
}) => {
  const haveStock = remainingStock > 0;
  const isDiscountAble = product.discounts.length > 0;

  return (
    <div className="text-sm text-gray-500 mb-2">
      <span
        className={`font-medium ${
          haveStock ? "text-green-600" : "text-red-600"
        }`}
      >
        재고: {remainingStock}개
      </span>
      {isDiscountAble && (
        <span className="ml-2 font-medium text-blue-600">
          최대 {(getProductMaxDiscount(product.discounts) * 100).toFixed(0)}%
          할인
        </span>
      )}
    </div>
  );
};

const DiscountInfo = ({ product }: { product: Product }) => {
  const isDiscountAble = product.discounts.length > 0;

  if (!isDiscountAble) return null;

  return (
    <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
      {product.discounts.map((discount, index) => (
        <li key={index}>
          {discount.quantity}개 이상: {(discount.rate * 100).toFixed(0)}% 할인
        </li>
      ))}
    </ul>
  );
};

const AddToCartButton = ({
  product,
  remainingStock,
  addToCart,
}: {
  product: Product;
  remainingStock: number;
  addToCart: (product: Product) => void;
}) => {
  const haveStock = remainingStock > 0;

  return (
    <button
      onClick={() => addToCart(product)}
      className={`w-full px-3 py-1 rounded ${
        haveStock
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
      disabled={!haveStock}
    >
      {haveStock ? "장바구니에 추가" : "품절"}
    </button>
  );
};

const ProductItem = ({ product, remainingStock, addToCart }: Props) => {
  return (
    <div
      key={product.id}
      data-testid={`product-${product.id}`}
      className="bg-white p-3 rounded shadow"
    >
      <Name product={product} />
      <StockAndMaxDiscount product={product} remainingStock={remainingStock} />
      <DiscountInfo product={product} />
      <AddToCartButton
        product={product}
        remainingStock={remainingStock}
        addToCart={addToCart}
      />
    </div>
  );
};

export default ProductItem;
