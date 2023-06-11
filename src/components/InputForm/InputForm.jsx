/* eslint-disable react/no-unescaped-entities */
import "./InputFormStyle.css";

const InputForm = () => {
  return (
    <div className='wave-container'>
      <form className='login'>
        <input
          className='rounded-2xl text-rose-500 outline-none duration-100 placeholder:text-rose-200 focus:ring-2 focus:ring-slate-500 '
          type='email'
          placeholder='tobie.lolness@exemple.com'
        />
        <p className='text-center  text-white'>
          Je suis l'ami.e de Tobie, tiens moi au courant !
        </p>
      </form>
    </div>
  );
};

export default InputForm;
