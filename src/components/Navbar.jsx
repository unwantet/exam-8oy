import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/useContextGlobal";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast, { Toaster } from "react-hot-toast";

import {
  clearCart,
  editItem,
  updateFromLocalStorage,
} from "../features/cart/CartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  // console.log(cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  const numItemsInCart = useSelector((state) => state.cart.numItemsInCart);
  const { user } = useContext(GlobalContext);
  useEffect(() => {
    toast.success(`Welcome ${user.displayName}`);
  }, []);

  useEffect(() => {
    dispatch(updateFromLocalStorage());
  }, [dispatch]);

  const signOutFunc = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="header-area">
      <div className="navbar top-0 left-0 right-0 z-50 bg-inherit shadow-lg border-none px-10">
        <div className="navbar-start gap-4">
          <div className="dropdown flex items-center gap-5">
            <label tabIndex="0" className="btn btn-ghost btn-circle">
              <Toaster />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-32 p-2 shadow-lg bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        stroke-dasharray="15"
                        stroke-dashoffset="15"
                        d="M4.5 21.5h15"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          dur="0.2s"
                          values="15;0"
                        />
                      </path>
                      <path
                        stroke-dasharray="15"
                        stroke-dashoffset="15"
                        d="M4.5 21.5V8M19.5 21.5V8"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          begin="0.2s"
                          dur="0.2s"
                          values="15;0"
                        />
                      </path>
                      <path
                        stroke-dasharray="24"
                        stroke-dashoffset="24"
                        d="M9.5 21.5V12.5H14.5V21.5"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          begin="0.4s"
                          dur="0.4s"
                          values="24;0"
                        />
                      </path>
                      <path
                        stroke-dasharray="30"
                        stroke-dashoffset="30"
                        stroke-width="2"
                        d="M2 10L12 2L22 10"
                      >
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          begin="0.5s"
                          dur="0.4s"
                          values="30;0"
                        />
                      </path>
                    </g>
                  </svg>
                  Homepage
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="black"
                      d="M10 13.25a.75.75 0 0 0 0 1.5h4a.75.75 0 1 0 0-1.5z"
                    />
                    <path
                      fill="black"
                      fill-rule="evenodd"
                      d="M14.665 2.33a.75.75 0 0 1 1.006.335l1.813 3.626c.428.022.817.055 1.17.106c1.056.151 1.93.477 2.551 1.245c.621.769.757 1.691.684 2.755c-.07 1.031-.35 2.332-.698 3.957l-.451 2.107c-.235 1.097-.426 1.986-.666 2.68c-.25.725-.58 1.32-1.142 1.775c-.562.455-1.214.652-1.974.745c-.73.089-1.64.089-2.76.089H9.802c-1.122 0-2.031 0-2.761-.089c-.76-.093-1.412-.29-1.974-.745c-.563-.455-.892-1.05-1.142-1.774c-.24-.695-.43-1.584-.666-2.68l-.451-2.107c-.348-1.626-.627-2.927-.698-3.958c-.073-1.064.063-1.986.684-2.755c.62-.768 1.494-1.094 2.55-1.245c.353-.05.743-.084 1.17-.106L8.33 2.665a.75.75 0 0 1 1.342.67l-1.46 2.917c.364-.002.747-.002 1.149-.002h5.278c.402 0 .785 0 1.149.002l-1.459-2.917a.75.75 0 0 1 .335-1.006M5.732 7.858l-.403.806a.75.75 0 1 0 1.342.67l.787-1.574c.57-.01 1.22-.011 1.964-.011h5.156c.744 0 1.394 0 1.964.01l.787 1.575a.75.75 0 0 0 1.342-.67l-.403-.806l.174.023c.884.127 1.317.358 1.597.703c.275.34.41.803.356 1.665H3.605c-.054-.862.081-1.325.356-1.665c.28-.345.713-.576 1.597-.703zM4.288 14.1a81.117 81.117 0 0 1-.481-2.35h16.386a82.85 82.85 0 0 1-.482 2.35l-.428 2c-.248 1.155-.42 1.954-.627 2.552c-.2.58-.404.886-.667 1.098c-.262.212-.605.348-1.212.422c-.629.077-1.447.078-2.628.078H9.85c-1.18 0-1.998-.001-2.627-.078c-.608-.074-.95-.21-1.212-.422c-.263-.212-.468-.519-.667-1.098c-.207-.598-.38-1.397-.627-2.552z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/statics">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    >
                      <path
                        stroke-miterlimit="5.759"
                        d="M3 3v16a2 2 0 0 0 2 2h16"
                      />
                      <path stroke-miterlimit="5.759" d="m7 14l4-4l4 4l6-6" />
                      <path d="M18 8h3v3" />
                    </g>
                  </svg>
                  Statics
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/create">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 48 48"
              className="cursor-pointer"
            >
              <g fill="none" strokeLinejoin="round" strokeWidth="4">
                <path
                  fill="#2f88ff"
                  stroke="#000"
                  d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                />
                <path stroke="#fff" strokeLinecap="round" d="M24 16V32" />
                <path stroke="#fff" strokeLinecap="round" d="M16 24L32 24" />
              </g>
            </svg>
          </Link>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">Unwanted еда</a>
        </div>
        <div className="navbar-end">
          <div className="flex gap-4 items-center">
            <button
              onClick={() => document.getElementById("my_modal_2").showModal()}
              className="indicator"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-warning indicator-item w-2">
                {numItemsInCart}
              </span>
            </button>
          </div>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box max-w-[377px]">
              <div>
                {cartTotal !== 0 ? (
                  <div className="flex justify-between mb-8">
                    <h1 className="font-bold text-lg">
                      CART ({cartItems.length})
                    </h1>
                    <button
                      onClick={() => dispatch(clearCart())}
                      className="link text-[15px] opacity-80"
                    >
                      Remove all
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
                {cartTotal !== 0 ? (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center mb-6"
                    >
                      <div className="flex gap-4 items-center">
                        <img
                          src={item.img[0]}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl"
                        />
                        <div>
                          <h2 className="font-bold">{item.name}</h2>
                          <p className="font-bold text-sm opacity-75">
                            $ {item.price}
                          </p>
                        </div>
                      </div>
                      <div className="max-w-24 flex justify-center items-center">
                        <button
                          onClick={() =>
                            dispatch(
                              editItem({ id: item.id, amount: item.amount - 1 })
                            )
                          }
                          className="text-center border-none bg-base-300 font-extrabold hover:opacity-65 w-8 h-8"
                        >
                          <span className="opacity-65 hover:opacity-100">
                            -
                          </span>
                        </button>
                        <input
                          type="text"
                          value={item.amount}
                          readOnly
                          className="text-center font-semibold border-none bg-base-300 w-8 h-8"
                        />
                        <button
                          onClick={() =>
                            dispatch(
                              editItem({ id: item.id, amount: item.amount + 1 })
                            )
                          }
                          className="text-center border-none bg-base-300 font-extrabold hover:opacity-65 w-8 h-8"
                        >
                          <span className="opacity-65 hover:opacity-100">
                            +
                          </span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center">
                    <p className="font-bold text-sm opacity-75 text-black">
                      No items in cart
                    </p>
                  </div>
                )}
                {cartTotal !== 0 ? (
                  <div>
                    <p className="flex justify-between mb-6">
                      <span>TOTAL</span>
                      <span className="font-bold">$ {cartTotal}</span>
                    </p>
                    <Link
                      to="/checkout"
                      className="bg-orange hover:bg-hoverOrange btn rounded-none w-full border-0 text-white font-semibold text-xs"
                    >
                      CHECKOUT
                    </Link>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <div className="dropdown dropdown-end ml-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">{user.displayName}</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={signOutFunc}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
