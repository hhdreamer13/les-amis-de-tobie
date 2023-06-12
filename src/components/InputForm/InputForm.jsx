/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import "./InputFormStyle.css";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const InputForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous error message
    setErrorMsg("");

    // Check if the email is empty
    if (!email.trim()) {
      setErrorMsg("Oh non ! t'as oublié ton email.");
      return;
    }

    // Check if the email is too long
    const maxLength = 254; // The maximum length according to the specification
    if (email.length > maxLength) {
      setErrorMsg(`Wow! C'est un très long email`);
      return;
    }

    // Check if the email format is valid
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setErrorMsg("Hmm, on ne reconnaît pas ce format d'email.");
      return;
    }

    try {
      await addDoc(collection(db, "emails"), {
        email: email,
        timestamp: serverTimestamp(),
      });
      setIsSubmitted(true);
    } catch (event) {
      setErrorMsg("Désolé, on rencontre des difficultés techniques.");
      // console.log(event);
    }
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className='wave-container w-80 sm:w-[400px]'>
      <form className='login' onSubmit={handleSubmit}>
        <input
          className='rounded-2xl text-rose-500 outline-none duration-100 placeholder:text-rose-200 focus:ring-2 focus:ring-slate-500 '
          type='email'
          placeholder={isSubmitted ? email : "tobie.lolness@exemple.com"}
          onChange={handleChange}
          disabled={isSubmitted}
        />

        <p className='text-center text-white'>
          {errorMsg
            ? errorMsg
            : isSubmitted
            ? "Merci et à très vite !"
            : "Je suis l'ami.e de Tobie, tiens moi au courant !"}
        </p>

        {!isSubmitted && (
          <button
            type='submit'
            className='absolute right-9 top-[62px] bg-white'
          >
            <svg
              width='30px'
              height='30px'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z'
                stroke='#292D32'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M9 9.51001L12 6.51001L15 9.51001'
                stroke='#292D32'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M12 6.51001V14.51'
                stroke='#292D32'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M6 16.51C9.89 17.81 14.11 17.81 18 16.51'
                stroke='#292D32'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        )}
      </form>
    </div>
  );
};

export default InputForm;
