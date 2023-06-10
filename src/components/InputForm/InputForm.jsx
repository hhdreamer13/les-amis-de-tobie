import "./InputFormStyle.css";

const InputForm = () => {
  return (
    <div className='relative'>
      <form className='login'>
        <input
          className='rounded-2xl text-rose-500 outline-none transition-all duration-100 placeholder:text-rose-300 focus:border-2 focus:border-solid focus:border-slate-400'
          type='email'
          placeholder='tobie@exemple.com'
        />

        <p className='px-1 text-slate-600'>
          Je suis l'ami.e de Tobie, tiens moi au courant !
        </p>
      </form>
    </div>
  );
};

export default InputForm;
