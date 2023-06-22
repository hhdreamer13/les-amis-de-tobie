/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { db } from "../utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Input from "../common/Input";
import {
  required,
  minLength,
  maxLength,
  emailValidation,
  number,
} from "../utils/validation";
import Checkbox from "../common/Checkbox";
import MoreInfo from "../common/MoreInfo";

import "../styles/inputForm.css";

// eslint-disable-next-line no-unused-vars
const InputForm = ({ showModal, setShowModal }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptTermsError, setAcceptTermsError] = useState(false);

  const [errorsCount, setErrorsCount] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!acceptTerms) {
      setAcceptTermsError(true);
      return;
    }

    // Check if all fields have a value
    if (
      !firstName ||
      !lastName ||
      !postalCode ||
      !emailAddress ||
      !acceptTerms
    ) {
      // console.error("Please fill in all fields");
      return;
    }

    // Check validation state of all fields before submitting
    if (errorsCount > 0) {
      // console.error("Please fill in all fields correctly");
      return;
    }

    try {
      await addDoc(collection(db, "users"), {
        firstName,
        lastName,
        postalCode,
        email: emailAddress,
        acceptTerms,
        timestamp: serverTimestamp(),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Désolé, on rencontre des difficultés techniques.", error);
    }
  };

  return (
    <div className='wave-container w-80 sm:w-[400px]'>
      <form
        className='login flex flex-col items-center'
        onSubmit={handleSubmit}
      >
        <div className='flex w-full gap-4'>
          <Input
            type='text'
            placeholder='Prénom'
            onChange={setFirstName}
            validation={[required, minLength(2), maxLength(50)]}
            setErrorsCount={setErrorsCount}
            disabled={isSubmitted}
          />

          <Input
            type='text'
            placeholder='Nom'
            onChange={setLastName}
            validation={[required, minLength(2), maxLength(50)]}
            setErrorsCount={setErrorsCount}
            disabled={isSubmitted}
          />
        </div>

        <Input
          type='text'
          placeholder='Code postal'
          onChange={setPostalCode}
          validation={[required, minLength(2), maxLength(10), number]}
          setErrorsCount={setErrorsCount}
          disabled={isSubmitted}
        />

        <Input
          type='email'
          placeholder='Adresse e-mail'
          onChange={setEmailAddress}
          validation={[required, minLength(5), maxLength(254), emailValidation]}
          setErrorsCount={setErrorsCount}
          disabled={isSubmitted}
        />
        <div className='my-3'>
          <Checkbox
            textColor={
              acceptTermsError
                ? "decoration-dotted underline decoration-rose-700 decoration-2 text-white"
                : "text-white"
            }
            text="Je mets mon chapeau d'aventurier et j'accepte avec joie que mes informations soient utilisées pour me tenir informé(e) des péripéties du projet « Les Amis de Tobie »."
            checked={acceptTerms}
            disabled={isSubmitted}
            onChange={(e) => {
              setAcceptTerms(e.target.checked);

              if (e.target.checked) {
                setAcceptTermsError(false);
              }
            }}
          />
        </div>
        <div className=''>
          <MoreInfo handleClick={() => setShowModal(true)} />
        </div>
        {!isSubmitted ? (
          <button
            type='submit'
            className='font-caveat text-white'
            aria-label='soumettre'
          >
            <div className='flex items-center'>
              <div className="inline-block h-8 w-32 -rotate-2 cursor-pointer touch-manipulation select-none rounded-sm border-0 border-solid bg-rose-300 text-center text-lg text-slate-900 no-underline after:absolute after:bottom-1 after:left-1 after:h-[calc(100%_-_1px)] after:w-[calc(100%_-_1px)] after:rounded-sm after:border after:border-solid after:border-slate-900 after:content-[''] hover:after:bottom-0.5 hover:after:left-0.5">
                Allons-y !
              </div>
            </div>
          </button>
        ) : (
          <p className='font-caveat text-xl text-amber-100 drop-shadow-lg'>
            Merci et à très vite !
          </p>
        )}
      </form>
    </div>
  );
};

export default InputForm;
