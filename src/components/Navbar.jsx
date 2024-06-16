import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/useContextGlobal";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { clearCart, editItem, updateFromLocalStorage } from "../features/CartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  const numItemsInCart = useSelector((state) => state.cart.numItemsInCart);
  const { user } = useContext(GlobalContext);

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
                <Link to="/">Homepage</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/statics">Statics</Link>
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
                          alt={item.cartName}
                          className="w-16 h-16 rounded-xl"
                        />
                        <div>
                          <h2 className="font-bold">{item.cartName}</h2>
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
                      <span className="font-bold">
                        $ {cartTotal}
                      </span>
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
