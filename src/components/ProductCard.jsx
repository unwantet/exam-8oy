import React from "react";

const ProductCard = ({ product }) => {
  return (
    <>
      <div className="text-orange-600 font-semibold uppercase tracking-wide font-bold">
        Coocking Time {product.cockingTime} minutes ⌚
      </div>
      <h1 className="mt-7 flex justify-start text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {product.name}
      </h1>
      <p className="mt-8 text-gray-600 flex justify-start opacity-85"><span className="text-black font-bold">Description :</span>  {product.description}</p>

      <div className="mt-6 flex items-center">
        <div className="text-3xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
