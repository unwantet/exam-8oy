import "../static/Login.css";
import { Link, Form, useActionData } from "react-router-dom";
import { useEffect } from "react"

import { UseSignup } from "../hooks/useSignup";

export const action = async ({ request }) => {
    let formData = await request.formData();
    let email = formData.get("Email");
    let photo = formData.get("Photo");
    let password = formData.get("Password");
    let name = formData.get("Name");
  
    return { email, password, name, photo };
  };

export default function Register() {

    let userSignup = useActionData();
    const { SignupWithGoogle, SigupWithPassword, user, error } = UseSignup();

    useEffect(() => {
        if (userSignup)
          SigupWithPassword(
            userSignup.email,
            userSignup.password,
            userSignup.name,
            userSignup.photo
          );
        console.log(userSignup);
      }, [userSignup]);
  return (
    <>
      <div className="max-w-[400px] mx-auto min-h-screen  grid place-items-center ">
        <video autoPlay muted loop className="background-video">
          <source src="/public/register.mp4" type="video/mp4" />
          Sizning brauzeringiz video formatini qo'llab-quvvatlamaydi.
        </video>
        <div className="">
          <Form method="post" className="form">
            <div className="title">
              Hey user,
              <br />
              <span>sign up to continue</span>
            </div>
            <input
              className="input"
              name="Name"
              placeholder="Name"
              type="text"
            />
            <input
              className="input"
              name="Photo"
              placeholder="Photo Url"
              type="url"
            />
            <input
              className="input"
              name="Email"
              placeholder="Email"
              type="email"
            />
            <input
              className="input"
              name="Password"
              placeholder="New Password"
              type="password"
            />
            <div className="login-with">
              <Link to="/login">
                <div className="button-log">
                  <span className="font-bold">L</span>
                </div>
              </Link>
              <div className="button-log" onClick={SignupWithGoogle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlSpace="preserve"
                  width="56.6934px"
                  viewBox="0 0 56.6934 56.6934"
                  version="1.1"
                  style={{ enableBackground: "new 0 0 56.6934 56.6934" }}
                  id="Layer_1"
                  height="56.6934px"
                  className="icon"
                >
                  <path d="M51.981,24.4812c-7.7173-0.0038-15.4346-0.0019-23.1518-0.001c0.001,3.2009-0.0038,6.4018,0.0019,9.6017c4.4693-0.001,8.9386-0.0019,13.407,0c-0.5179,3.0673-2.3408,5.8723-4.9258,7.5991c-1.625,1.0926-3.492,1.8018-5.4168,2.139c-1.9372,0.3306-3.9389,0.3729-5.8713-0.0183c-1.9651-0.3921-3.8409-1.2108-5.4773-2.3649c-2.6166-1.8383-4.6135-4.5279-5.6388-7.5549c-1.0484-3.0788-1.0561-6.5046,0.0048-9.5805c0.7361-2.1679,1.9613-4.1705,3.5708-5.8002c1.9853-2.0324,4.5664-3.4853,7.3473-4.0811c2.3812-0.5083,4.8921-0.4113,7.2234,0.294c1.9815,0.6016,3.8082,1.6874,5.3044,3.1163c1.5125-1.5039,3.0173-3.0164,4.527-4.5231c0.7918-0.811,1.624-1.5865,2.3908-2.4196c-2.2928-2.1218-4.9805-3.8274-7.9172-4.9056C32.0723,4.0363,26.1097,3.995,20.7871,5.8372C14.7889,7.8907,9.6815,12.3763,6.8497,18.0459c-0.9859,1.9536-1.7057,4.0388-2.1381,6.1836C3.6238,29.5732,4.382,35.2707,6.8468,40.1378c1.6019,3.1768,3.8985,6.001,6.6843,8.215c2.6282,2.0958,5.6916,3.6439,8.9396,4.5078c4.0984,1.0993,8.461,1.0743,12.5864,0.1355c3.7284-0.8581,7.256-2.6397,10.0725-5.24c2.977-2.7358,5.1006-6.3403,6.2249-10.2138C52.5807,33.3171,52.7498,28.8064,51.981,24.4812z" />
                </svg>
              </div>
              <div className="button-log">
                <svg
                  className="icon"
                  height="56.693px"
                  id="Layer_1"
                  version="1.1"
                  viewBox="0 0 56.693 56.693"
                  width="56.693px"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <path d="M40.43,21.739h-7.645v-5.014c0-1.883,1.248-2.322,2.127-2.322c0.877,0,5.395,0,5.395,0V6.125l-7.43-0.029c-8.248,0-10.125,6.174-10.125,10.125v5.518h-4.77v8.53h4.77c0,10.947,0,24.137,0,24.137h10.033c0,0,0-13.32,0-24.137h6.77L40.43,21.739z" />
                </svg>
              </div>
            </div>
            <button className="button-confirm" type="submit">Let`s go →</button>
          </Form>
        </div>
      </div>
    </>
  );
}
