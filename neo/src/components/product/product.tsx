import "./product.css";

export const Product = ({
  productId,
  productTitle,
}: {
  productId: number;
  productTitle: string;
}) => {
  console.log(
    "🟢 ProductCard rendered on:",
    typeof window === "undefined" ? "SERVER" : "CLIENT",
  );
 // comment to test the build cache
  return (
    <div className="neo-product">
      <div className="neo-product__row neo-product__id">
        Product id: {productId}
      </div>
      <div className="neo-product__row neo-product__title">
        Product title: {productTitle}
      </div>
    </div>
  );
};
