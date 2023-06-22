/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-unresolved */
import { useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitType from "split-type";

import InputForm from "./InputForm";

gsap.registerPlugin(ScrollTrigger);

// Mobile browser screen size unchange with scrolling
// ScrollTrigger.normalizeScroll(true);
ScrollTrigger.config({ ignoreMobileResize: true });

gsap.config({
  autoSleep: 30,
  force3D: true,
});

/**
 * Import layers
 */
import group1Leaf1 from "/leaf/group1-leaf-left-bottom.webp";
import group1Leaf2 from "/leaf/group1-leaf-left-top.webp";
import group1Leaf3 from "/leaf/group1-leaf-right-bottom.webp";
import group1Leaf4 from "/leaf/group1-leaf-right-top.webp";

import group2Leaf1 from "/leaf/group2-leaf-bottom.webp";
import group2Leaf2 from "/leaf/group2-leaf-left-bottom.webp";
import group2Leaf3 from "/leaf/group2-leaf-left-top.webp";
import group2Leaf4 from "/leaf/group2-leaf-right-top.webp";
import group2Leaf5 from "/leaf/group2-leaf-right.webp";

import group3Leaf1 from "/leaf/group3-branch-left.webp";
import group3Leaf2 from "/leaf/group3-branch-right.webp";

import group4Leaf1 from "/leaf/group4-bushes-left.webp";
import group4Leaf2 from "/leaf/group4-bushes-right.webp";

import group5Leaf1 from "/leaf/group5-bushes-bottom.webp";
import group5Leaf2 from "/leaf/group5-rock-right.webp";

// import group0Leaf0 from "/leaf/group0-leaf-left-top.webp";
// import group0Leaf1 from "/leaf/group0-leaf-left.webp";
// import group0Leaf2 from "/leaf/group0-leaf-right.webp";

/**
 * Tobie frames load
 */
const frameCount = 49; // Number of frames in your animation
const images = []; // Array to store your image frames
const tobie = { frame: 0 }; // Object to keep track of the current frame

// Load each image frame into the array
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = `/tobie/tobie${i + 1}.webp`;
  images.push(img);
}

/**
 * Component
 */
const Leaf = ({ showModal, setShowModal }) => {
  const scrollPages = 11;

  // Refs
  const group1Refs = useRef([]);
  const group2Refs = useRef([]);
  const group3Refs = useRef([]);
  const group4Refs = useRef([]);
  const group5Refs = useRef([]);

  const tobieRef = useRef();
  const bgRef = useRef();
  const bgSecRef = useRef();

  const titleRef = useRef();
  const textRef = useRef();
  const formRef = useRef();

  const scrollRef = useRef();

  // Scroll to the top of the page whenever the component is mounted
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  /**
   * Leaf exit animation
   */
  useLayoutEffect(() => {
    // Create a GSAP context
    let ctx = gsap.context(() => {
      // animation helper function
      const animate = (groupRefs, end, xPercentPos = 50, xPercentNeg = -50) => {
        groupRefs.current.forEach((leaf) => {
          if (leaf && leaf.dataset && leaf.dataset.position) {
            const position = leaf.dataset.position;
            let xPercent = 0;
            let yPercent = 0;

            // Define final direction of movement based on position
            if (position.includes("left")) {
              xPercent = xPercentNeg;
            } else if (position.includes("right")) {
              xPercent = xPercentPos;
            }

            if (position.includes("top")) {
              yPercent = -50;
            } else if (position.includes("bottom")) {
              yPercent = 50;
            }

            gsap.to(leaf, {
              scrollTrigger: {
                trigger: leaf,
                start: "top top", // When the top of the element hits the bottom of the viewport
                end: end,
                scrub: 1,
                // markers: {
                //   startColor: "blue",
                //   endColor: "fuchsia",
                //   fontSize: "1rem",
                //   indent: 20,
                // },
              },
              xPercent: xPercent,
              yPercent: yPercent,
              duration: 1,
            });
          }
        });
      };

      animate(group1Refs, "100% top", 65);
      animate(group2Refs, "150% top", 60);
      animate(group3Refs, "200% top", 55); // Use 200 for branch of group 3
      animate(group4Refs, "250% top", 50);
      animate(group5Refs, "300% top", 45);
    });

    return () => ctx.revert(); // Cleanup animations when component unmounts
  }, []);

  /**
   * Tobie run animation
   */

  // Calculate the portion of the frame to be drawn
  const calculateSourceRect = () => {
    const bgAspectRatio =
      bgRef.current.naturalWidth / bgRef.current.naturalHeight;
    const viewportAspectRatio = window.innerWidth / window.innerHeight;

    let sx, sy, sWidth, sHeight;

    if (viewportAspectRatio > bgAspectRatio) {
      // Width is fitting, height is being cropped
      sWidth = bgRef.current.naturalWidth;
      sHeight = bgRef.current.naturalWidth / viewportAspectRatio;
      sx = 0;
      sy = (bgRef.current.naturalHeight - sHeight) / 2;
    } else {
      // Height is fitting, width is being cropped
      sHeight = bgRef.current.naturalHeight;
      sWidth = bgRef.current.naturalHeight * viewportAspectRatio;
      sx = (bgRef.current.naturalWidth - sWidth) / 2;
      sy = 0;
    }

    return [sx, sy, sWidth, sHeight];
  };

  // Handle resize
  useLayoutEffect(() => {
    const handleResize = () => {
      const canvas = tobieRef.current;
      canvas.width = bgRef.current.width;
      canvas.height = bgRef.current.height;
      calculateSourceRect();
    };

    // Initial setting
    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [bgRef]);

  useLayoutEffect(() => {
    if (tobieRef.current) {
      const canvas = tobieRef.current;
      const context = canvas.getContext("2d");

      canvas.width = bgRef.current.width;
      canvas.height = bgRef.current.height;

      // Animate the image sequence with GSAP
      gsap.to(tobie, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: tobieRef.current,
          scrub: 1,
          start: "top top",
          end: "400% bottom",
          // markers: true,
        },
        onUpdate: () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          const [sx, sy, sWidth, sHeight] = calculateSourceRect();
          context.drawImage(
            images[tobie.frame],
            sx,
            sy,
            sWidth,
            sHeight,
            0,
            0,
            canvas.width,
            canvas.height
          );
        },
      });
    }
  }, [tobieRef, bgRef]);

  /**
   * Title animation
   */
  useLayoutEffect(() => {
    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "200% top",
        end: "400% bottom",
        scrub: 1,
      },
      opacity: 1,
      duration: 3,
      ease: "power2.inOut",
    });

    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "400% top",
        end: "700% bottom",
        scrub: 1,
      },
      top: "-30vh",
      color: "white", // change color to white
      fontSize: "4rem", // make size smaller
      lineHeight: "2em",
      duration: 3,
      ease: "power2.inOut",
    });
  }, [titleRef]);

  /**
   * Background Change Animation
   */
  useLayoutEffect(() => {
    gsap.to(bgSecRef.current, {
      scrollTrigger: {
        trigger: bgSecRef.current,
        start: "400% top",
        end: "700% center",
        scrub: 1,
        // markers: true,
      },
      opacity: 1,
    });
  }, [bgSecRef]);

  /**
   * Text Animation
   */
  useLayoutEffect(() => {
    if (textRef.current && textRef.current.textContent) {
      const st = new SplitType(textRef.current, { types: "words" });
      const words = st.words;

      gsap.set(words, { transformOrigin: "0% 50%" });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: "600% top",
          end: "850% center",
          // markers: true,
          scrub: 1,
        },
      });

      tl.from(words, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
      }).to(words, {
        opacity: 0,
        xPercent: (pos, _, arr) =>
          pos < arr.length / 2
            ? Math.abs(pos - arr.length / 2) * gsap.utils.random(-20, -10)
            : Math.abs(pos - arr.length / 2) * gsap.utils.random(10, 20),
        yPercent: (pos, _, arr) =>
          Math.abs(pos - arr.length / 2) * gsap.utils.random(-40, -20) - 150,
        rotationY: (pos, _, arr) =>
          pos > arr.length / 2
            ? Math.abs(pos - arr.length / 2) * -15
            : Math.abs(pos - arr.length / 2) * 15,
        z: (pos, _, arr) =>
          Math.abs(pos - arr.length / 2)
            ? gsap.utils.random(-40, -20)
            : gsap.utils.random(20, 40),
        stagger: {
          each: 0.05,
          from: "edges",
        },
        delay: 1,
        // stagger: 0.1,
      });
    }
  }, [textRef]);

  /**
   * Form Animation
   */
  useLayoutEffect(() => {
    gsap.to(formRef.current, {
      scrollTrigger: {
        trigger: formRef.current,
        start: "820% top",
        end: "950% center",
        scrub: 1,
        // markers: true,
      },
      opacity: 1,
      duration: 3,
      ease: "power2.out",
    });
  }, [formRef]);

  /**
   * Scroll Animation
   */
  useLayoutEffect(() => {
    gsap.to(scrollRef.current, {
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "10% top", // when top of divRef is 10% from top of the viewport
        toggleActions: "play none none reverse",
        // markers: true,
      },
      autoAlpha: 0,
      duration: 1,
    });
  }, [scrollRef]);

  return (
    <>
      <div style={{ height: `${scrollPages * 100}vh` }}>
        <main className='fixed h-screen w-full overflow-hidden'>
          {/* Background Image */}
          <img
            ref={bgRef}
            className='fullscreenImage absolute'
            src='/leaf/bg-1080.webp'
            alt='background 1 Tobie'
          />

          {/* Tobie animation */}
          <canvas
            ref={tobieRef}
            className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2'
            id='sprite'
          />

          {/* Group 5 */}
          <img
            ref={(el) => group5Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group5Leaf1}
            alt='Decor Tobie'
            data-group='5'
            data-position='bottom'
          />
          <img
            ref={(el) => group5Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group5Leaf2}
            alt='Decor Tobie'
            data-group='5'
            data-position='right-bottom'
          />
          {/* Group 4 */}
          <img
            ref={(el) => group4Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group4Leaf1}
            alt='Decor Tobie'
            data-group='4'
            data-position='left-bottom'
          />
          <img
            ref={(el) => group4Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group4Leaf2}
            alt='Decor Tobie'
            data-group='4'
            data-position='right-bottom'
          />
          {/* Group 3 */}
          <img
            ref={(el) => group3Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group3Leaf1}
            alt='Decor Tobie'
            data-group='3'
            data-position='left'
          />
          <img
            ref={(el) => group3Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group3Leaf2}
            alt='Decor Tobie'
            data-group='3'
            data-position='right-top'
          />
          {/* Group 2 */}
          <img
            ref={(el) => group2Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group2Leaf1}
            alt='Decor Tobie'
            data-group='2'
            data-position='bottom'
          />
          <img
            ref={(el) => group2Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group2Leaf2}
            alt='Decor Tobie'
            data-group='2'
            data-position='left-bottom'
          />
          <img
            ref={(el) => group2Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group2Leaf3}
            alt='Decor Tobie'
            data-group='2'
            data-position='left-top'
          />
          <img
            ref={(el) => group2Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group2Leaf4}
            alt='Decor Tobie'
            data-group='2'
            data-position='right-top'
          />
          <img
            ref={(el) => group2Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group2Leaf5}
            alt='Decor Tobie'
            data-group='2'
            data-position='right'
          />
          {/* Group 1 */}
          <img
            ref={(el) => group1Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group1Leaf1}
            alt='Decor Tobie'
            data-group='1'
            data-position='left-bottom'
          />
          <img
            ref={(el) => group1Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group1Leaf2}
            alt='Decor Tobie'
            data-group='1'
            data-position='left-top'
          />
          <img
            ref={(el) => group1Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group1Leaf3}
            alt='Decor Tobie'
            data-group='1'
            data-position='right-bottom'
          />
          <img
            ref={(el) => group1Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group1Leaf4}
            alt='Decor Tobie'
            data-group='1'
            data-position='right-top'
          />
          <img
            ref={bgSecRef}
            style={{ opacity: 0 }}
            className='fullscreenImage absolute'
            src='/leaf/bg-secondary.webp'
            alt='background Tobie'
          />
          {/* Scroll icon */}
          <div
            ref={scrollRef}
            className='fullscreenImage absolute flex h-full w-full rotate-180 items-center justify-center sm:rotate-0'
          >
            <div className='relative h-[60px] w-[30px] rounded-[15px] border-[3px] border-solid border-amber-200'>
              <div className='absolute bottom-[34px] left-1 top-1 w-4 animate-[scroller_2000ms_ease-out_infinite] rounded-lg bg-lime-300'></div>
            </div>
          </div>
          {/* Text Tobie */}
          <header
            ref={titleRef}
            className='fullscreenImage absolute'
            style={{
              opacity: 0,
              fontSize: "10rem",
              color: "rgb(15 23 42)",
              lineHeight: "0.9em",
            }}
          >
            <div className='flex h-full flex-col items-center justify-center'>
              <h1 className='text-center font-mottona'>
                <span className=''>Les Amis de</span> <br />
                <span className='text-[12rem]'>Tobie</span>
              </h1>
            </div>
          </header>
          {/* Text */}
          <section className='fullscreenImage absolute'>
            <div
              ref={textRef}
              className='mx-2 flex h-full flex-col items-center justify-center gap-10 px-2 text-center'
            >
              <h2 className='font-caveat text-2xl leading-normal text-slate-900 md:text-3xl'>
                Tobie et ses amis sont sur le point d'arriver ! <br />
                Une aventure incroyable nous attend. <br />
                Sois parmi les premiers à le savoir.
              </h2>
            </div>
          </section>
          {/* Form */}
          <section
            ref={formRef}
            className='fullscreenImage absolute'
            style={{ opacity: 0 }}
          >
            <div className='mx-2 mt-24 flex h-full flex-col items-center justify-center gap-10 px-2 text-center'>
              <InputForm showModal={showModal} setShowModal={setShowModal} />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Leaf;
