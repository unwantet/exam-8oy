import {
  clearCart,
  editItem,
  updateFromLocalStorage,
} from "../features/cart/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import FlipCard from "../components/FlipCard";
import { toast, Toaster } from "react-hot-toast";

export default function Cart() {
  const [inputValue, setInputValue] = useState("");
  const [promo , setPromo] = useState("")
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  const numItemsInCart = useSelector((state) => state.cart.numItemsInCart);
  console.log(cartItems);
  useEffect(() => {
    dispatch(updateFromLocalStorage());
  }, [dispatch]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const promoValue = (e) =>{
    setPromo(e.target.value)
  }
  const promoCheck =() =>{
        if (promo === "unwanted") {
            toast.success("You wrote a true Promo code")
            setPromo('')
        }else{
            toast.error("Your Promo code is uncorrect write another")
            setPromo('')
        }
  }

  const cardAdd = () => {
    if (inputValue >= 16) {
      toast.success("Your card is added sucsessfully");
    } else {
      toast.error("Please ! Lenght of card's number must be 16 nums");
    }
  };

  return (
    <div className="align-content mt-16">
      <Toaster />
      <div className="flex gap-10  justify-center flex-wrap-reverse">
        <div className="flex flex-col gap-5">
          {cartTotal !== 0 ? (
            cartItems.map((item) => (
              <div className="w-[800px] flex justify-around bg-gray-500 p-3 rounded-xl items-center">
                <img
                  src={item.img[0]}
                  alt=""
                  className="w-32 h-32 rounded-xl"
                />
                <div className="flex flex-col gap-5 ">
                  <h1 className="text-xl font-bold capitalize">{item.name}</h1>
                  <p className="text-lg capitalize text-lime-100 font-semibold">
                    {item.category}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-white">food's price : </p>
                  <h1 className="text-2xl font-extrabold font-serif">
                    ${item.price}
                  </h1>
                </div>
                <div className=" flex justify-center items-center">
                  <button
                    onClick={() =>
                      dispatch(
                        editItem({ id: item.id, amount: item.amount - 1 })
                      )
                    }
                    className="text-center border-none text-3xl text-white bg-gray-400 font-extrabold hover:opacity-65 w-14 rounded-xl h-14"
                  >
                    <span className="opacity-65 hover:opacity-100">-</span>
                  </button>

                  <input
                    type="text"
                    value={item.amount}
                    readOnly
                    className="text-center font-semibold border-none  w-14 rounded-xl h-14"
                  />
                  <button
                    onClick={() =>
                      dispatch(
                        editItem({ id: item.id, amount: item.amount + 1 })
                      )
                    }
                    className="text-center border-none text-3xl text-white bg-gray-400  font-extrabold hover:opacity-65 w-14 rounded-xl h-14"
                  >
                    <span className="opacity-65 hover:opacity-100">+</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <p className="font-bold text-xl opacity-75 text-black">
                No items in cart
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5 w-[526px] bg-[#212121d4] p-5 rounded-2xl">
          <h1 className="text-xl font-extrabold text-accent">
            Order Summary : )
          </h1>
          <div className="flex items-center justify-between border-b-2 border-b-slate-600 pb-5">
            <div className="flex flex-col gap-5">
              <p className="text-secondary font-bold">
                Enter your card number:
              </p>
              <input
                placeholder="(only 16 numbers)"
                className="text-white border-2 h-9 border-[#8707ff] rounded-lg p-2.5 bg-transparent max-w-[190px] focus:outline-none focus:ring-4 focus:ring-[#8707ff]/60"
                name="text"
                type="number"
                value={inputValue}
                onChange={handleChange}
              />
              <button onClick={cardAdd} className="btnaka">
                <span> Button</span>
              </button>
            </div>
            <FlipCard inputValue={inputValue} />
          </div>
          <div className="flex flex-col gap-5 border-b-2 border-b-slate-600 pb-5">
            <h1 className="font-bold text-amber-600">Promo Code:</h1>
            <div class="search">
              <input placeholder="your promo code" type="text" value={promo} onChange={promoValue} />
              <button type="submit" onClick={promoCheck}>Check</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
