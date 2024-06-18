// src/pages/Single.js

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { addItem } from "../features/cart/CartSlice";
import { MdOutlineShoppingCart } from "react-icons/md";
import ImagesContainer from "../components/ImagesContainer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../src/firebase/firebaseConfig";
import { useLoaderData } from "react-router-dom";
import "../static/single.css";
import ApexCharts from "../components/Pirchart";

export const loader = async ({ params }) => {
  const docRef = doc(db, "eda", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }

  return null;
};

const Single = () => {
  const data = useLoaderData();
  const product = data;
  console.log(product);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ product: { ...product, amount: quantity } }));
    console.log({ product: { ...product, amount: quantity } });
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4 max-w-[1110px]">
      <div className="flex flex-wrap">
        <div className="w-1/2">
          <img
            src={product.img[0]}
            alt=""
            className="min-w-[542px] rounded-xl imgman"
          />
          <div className="flex gap-8 mt-8">
            <ImagesContainer product={product} />
          </div>
          <div className="mt-10">
            <ApexCharts titles={product.ingrediends} />
          </div>
        </div>
        <div className="max-w-[445px] h-[426px] mx-auto mt-16 ">
          <ProductCard product={product} />
          <div className="mt-10  flex items-center gap-4 ">
            <div className="flex items-center border rounded-lg bg-base-300 btn btn-md">
              <button
                className="w-8 h-8 leading-10 text-gray-600 transition hover:opacity-75 text-orange-600 font-extrabold text-2xl"
                onClick={handleDecrement}
              >
                -
              </button>
              <input
                type="text"
                className="h-10 w-16 text-center border-none bg-base-300"
                value={quantity}
                readOnly
              />
              <button
                className="w-10 h-10 leading-10 text-orange-600 font-extrabold text-2xl transition hover:opacity-75"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
            <button
              className="flex items-center btn bg-orange-600 text-white btn-md font-bold w-64 py-2 px-4 rounded-lg shadow hover:bg-orange-700 transition"
              onClick={handleAddToCart}
            >
              <MdOutlineShoppingCart className="mr-2" />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
