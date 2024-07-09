import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/buyit-logo.png";

type Response = {
  credential: string;
  clientId: string;
  select_by: string;
};

type GoogleUser = {
  name: string;
  email: string;
  picture: string;
  sub: string;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Login = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<GoogleUser | null>(() => {
    const storedUser = localStorage.getItem("buyit-auth");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleLoginSuccess = async (res: Response) => {
    try {
      const decodedData: GoogleUser = jwtDecode(res.credential);
      const user = {
        name: decodedData.name,
        email: decodedData.email,
        picture: decodedData.picture,
        sub: decodedData.sub,
      };
      localStorage.setItem("buyit-auth", JSON.stringify(user));
      alert(`welcome ${user.name}`);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error saving user data to server:", error);
    }
  };

  const handleLoginError = () => {
    alert("plaese try again later");
  };
  const handleLogout = () => {
    localStorage.removeItem("buyit-auth");
    window.location.reload();
  };

  return (
    <div>
      <button className="flex items-center" onClick={openModal}>
        {!user ? (
          <FaRegUser size={22} />
        ) : (
          <div className="grid grid-cols-1 place-items-center">
            <img className="rounded-full" src={user.picture} width={32} />
            <p className="text-xs">{user.name}</p>
          </div>
        )}
        &nbsp;
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>
          <IoMdClose />
        </button>
        <br />
        {!user ? (
          <div className="grid grid-cols-1 place-items-center">
            <img src={logo} alt="logo" width={100} />
            <p className="m-3">
              Log in to access a world of convenience at your fingertips. BuyIt{" "}
              <br />
              brings you the freshest groceries, essential household items, and{" "}
              <br />
              much more, delivered straight to your door in minutes.
            </p>
            <GoogleOAuthProvider clientId="382479443707-2hbdl2jvs0iduh9dmfk3t86q62gg796b.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
              />
            </GoogleOAuthProvider>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            <p>
              We will miss you <b>{user.name}</b>
            </p>

            <button
              onClick={handleLogout}
              className="bg-red-500 p-2 text-white rounded w-full"
            >
              LOGOUT
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Login;
