import React from 'react'
import { useRouter } from "next/router";
import { useAuth } from "../auth/UserAuthContext";
import { setErrorMessage } from "../auth/setErrorMessage";
import Navbar from '../components/Navbar';

export default function Signin() {
  const router = useRouter();
  const auth = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    auth
      .logIn(data.get("email"), data.get("password"))
      .then(() => {
        // do something after signing in. For example, router.push("/");
        router.push("/");
      })
      .catch((error) => {
        let { title, description } = setErrorMessage(error);
        // do something with error title and description here
        alert(title + ": " + description);
      });
  };

  return (
    <div className=" bg-black h-screen">
        <Navbar loggedIn={false}/>
        <div className="text-white bg-black h-full font-sans flex items-center justify-center text-center">
            <form onSubmit={handleSubmit} className="w-80 p-8 bg-white text-black" >
                <h1 className="text-black uppercase font-medium mt-5 mb-8">
                    Login / Sign In
                </h1>
                <input type="text" name="email" placeholder="Enter Email Address" id="username" 
                    className="bg-none border-2 block mx-auto my-8 w-56 rounded-xl text-center outline-0 px-2.5 py-3.5
                                focus:border-black"
                />
                <input type="password" name="password" placeholder="Enter Password" id="password"
                    className="bg-none border-2 block mx-auto my-8 w-56 rounded-xl text-center outline-0 px-2.5 py-3.5
                                focus:border-black"
                />
                <input type="submit" value="Sign In"
                    className="bg-black text-white my-0 mx-auto px-5 py-3.5 rounded-md"
                />
            </form>
        </div>
    </div>
    
  )
}
