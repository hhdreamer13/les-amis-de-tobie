import { useState } from "react";
import { Helmet } from "react-helmet";
import Leaf from "../components/Leaf";
import Modal from "../components/Modal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Les Amis de Tobie</title>
        <meta
          name='description'
          content='Bienvenue sur le site officiel de « Les Amis de Tobie ». Embarquez avec nous dans cette aventure unique et passionnante! Restez informé(e) des nouvelles de notre projet.'
        />
        <meta property='og:title' content='Les Amis de Tobie' />
        <meta
          property='og:description'
          content='Bienvenue sur le site officiel de « Les Amis de Tobie ». Embarquez avec nous dans cette aventure unique et passionnante! Restez informé(e) des nouvelles de notre projet.'
        />
        <meta property='og:image' content='/tobie-icon.webp' />
        <meta property='og:url' content='https://www.lesamisdetobie.fr' />
        <link rel='canonical' href='https://www.lesamisdetobie.fr' />
      </Helmet>
      <div className=''>
        <Modal showModal={showModal} setShowModal={setShowModal} />
        <Leaf showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default Home;
