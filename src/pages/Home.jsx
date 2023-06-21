import { useState } from "react";
import Leaf from "../components/Leaf";
import Modal from "../components/Modal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className=''>
        <Modal showModal={showModal} setShowModal={setShowModal} />
        <Leaf showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default Home;
