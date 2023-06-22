/* eslint-disable react/no-unescaped-entities */
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const Modal = ({ showModal, setShowModal }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  const handleClose = () => {
    // exit animation
    gsap.to(contentRef.current, {
      y: "-100vh",
      duration: 1,
      ease: "elastic.in(1, 0.75)",
    });

    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.in",
      onComplete: () => setShowModal(false),
    });
  };

  useLayoutEffect(() => {
    // enter animation
    if (showModal) {
      gsap.set(modalRef.current, { opacity: 0 });
      gsap.set(contentRef.current, { y: "-100vh" });

      gsap.to(modalRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      });
      gsap.to(contentRef.current, {
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "back.out(1.7)",
      });
    }
  }, [showModal]);

  return (
    <>
      {showModal && (
        <div
          ref={modalRef}
          style={{ opacity: 0 }}
          className='fixed left-0 top-0 z-10 h-full w-full bg-black bg-opacity-60'
        >
          <div
            ref={contentRef}
            style={{ transform: "translateY(-100vh)" }}
            className='relative mx-auto mt-14 flex max-h-[90vh] w-4/5 flex-col overflow-y-auto rounded-2xl bg-teal-50 pb-6 pt-10 text-center shadow-2xl will-change-transform lg:w-3/5'
          >
            <div className='mx-5 rounded-xl bg-teal-100 px-4 py-10 text-slate-900 shadow-md sm:mx-10'>
              <h2 className='font-caveat  text-2xl drop-shadow-md'>
                L’arbre comme alternative au merchandising de la série
                d’animation
                <h2 className='mt-5 font-mottona text-5xl drop-shadow-md'>
                  Tobie Lolness
                </h2>
              </h2>
              <p className='m-5 text-justify font-caveat text-xl leading-relaxed drop-shadow-sm sm:m-5'>
                Nous le savons, les barrières psychologiques à l'action contre
                le changement climatique sont puissantes. Nous sommes de plus en
                plus lucides, documentés, et pourtant toujours aussi
                impuissants. L'information ne suffit pas, il faut être touchés
                dans nos émotions pour se sentir concerné. Nous sommes
                convaincus que les récits inspirants et vraisemblables peuvent
                transformer l'eco-anxiété en éco-empathie et permettre aux gens
                de passer à l'action Nous pouvons contribuer, à notre échelle, à
                limiter la surconsommation et à sensibiliser les générations
                futures aux merveilles qui garantiront leur survie. C'est le
                cœur du projet Les amis de Tobie.
              </p>
              <p className='text-justify font-caveat text-xl drop-shadow-sm sm:m-5'>
                Si vous avez quelque chose à dire ou si vous avez des questions,
                n'hésitez pas à nous envoyer un e-mail à :
              </p>
              <a
                className='font-caveat text-2xl drop-shadow-md'
                href='mailto:lesamisdetobie@gmail.com'
              >
                lesamisdetobie@gmail.com
              </a>
              {/* Close button */}
              <div className='font-delius absolute right-3 top-3 text-xl'>
                <button onClick={handleClose}>
                  <svg
                    width='30px'
                    height='30px'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M12 20.4C10.8969 20.4 9.80459 20.1827 8.78546 19.7606C7.76632 19.3384 6.84031 18.7197 6.0603 17.9397C5.28029 17.1597 4.66155 16.2337 4.23941 15.2145C3.81727 14.1954 3.6 13.1031 3.6 12C3.6 10.8969 3.81727 9.80459 4.23941 8.78546C4.66155 7.76632 5.28029 6.84031 6.0603 6.0603C6.84032 5.28029 7.76633 4.66155 8.78546 4.23941C9.8046 3.81727 10.8969 3.6 12 3.6C13.1031 3.6 14.1954 3.81727 15.2145 4.23941C16.2337 4.66155 17.1597 5.28029 17.9397 6.0603C18.7197 6.84032 19.3384 7.76633 19.7606 8.78546C20.1827 9.8046 20.4 10.8969 20.4 12C20.4 13.1031 20.1827 14.1954 19.7606 15.2145C19.3384 16.2337 18.7197 17.1597 17.9397 17.9397C17.1597 18.7197 16.2337 19.3384 15.2145 19.7606C14.1954 20.1827 13.1031 20.4 12 20.4L12 20.4Z'
                      stroke='#2A4157'
                      strokeOpacity='0.24'
                      strokeWidth='1.2'
                    />
                    <path
                      d='M9 9L15 15'
                      stroke='#222222'
                      strokeWidth='1.2'
                      strokeLinecap='round'
                    />
                    <path
                      d='M15 9L9 15'
                      stroke='#222222'
                      strokeWidth='1.2'
                      strokeLinecap='round'
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className='mt-3 flex items-center justify-center gap-6'>
              <a
                href='https://kinome.fr/'
                title='Visitez le site de Kinome'
                rel='noopener noreferrer'
                target='_blank'
              >
                <img
                  className='w-20'
                  src='/kinome-logo.webp'
                  alt='Kinome logo'
                />
              </a>
              <a
                href='https://www.tantmieuxprod.net/'
                title='Visitez le site de Tant Mieux Prod'
                rel='noopener noreferrer'
                target='_blank'
              >
                <img
                  className='w-20'
                  src='/logo-tant-mieux.webp'
                  alt='Tant Mieux Prod logo'
                />
              </a>
              <a
                href='https://www.onf.fr/'
                title="Visitez le site d'ONF"
                rel='noopener noreferrer'
                target='_blank'
              >
                <img className='w-20' src='/logo-onf.webp' alt='ONF logo' />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
