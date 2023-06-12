/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import "./InputFormStyle.css";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const InputForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, "emails"), {
        email: email,
        timestamp: serverTimestamp(),
      });
      setIsSubmitted(true);
    } catch (event) {
      console.error("Error adding document: ", event);
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
          {isSubmitted
            ? "Tobie te remercie !"
            : "Je suis l'ami.e de Tobie, tiens moi au courant !"}
        </p>
        {!isSubmitted && (
          <button type='submit' className='absolute right-9 top-[62px]'>
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
