/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-unresolved */
import { useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

import InputForm from "./InputForm/InputForm";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(true);

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

import group0Leaf0 from "/leaf/group0-leaf-left-top.webp";
import group0Leaf1 from "/leaf/group0-leaf-left.webp";
import group0Leaf2 from "/leaf/group0-leaf-right.webp";

/**
 * Tobie frames load
 */
const frameCount = 41; // Number of frames in your animation
const images = []; // Array to store your image frames
const tobie = { frame: 0 }; // Object to keep track of the current frame

// Load each image frame into the array
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = `/tobie-run-scene/tobie${i + 1}.png`;
  images.push(img);
}

/**
 * Component
 */
const Leaf = () => {
  const scrollPages = 10;

  // Refs
  const group1Refs = useRef([]);
  const group2Refs = useRef([]);
  const group3Refs = useRef([]);
  const group4Refs = useRef([]);
  const group5Refs = useRef([]);

  const tobieRef = useRef();
  const bgRef = useRef();
  const bgSecRef = useRef();

  const textRef = useRef();
  const formRef = useRef();

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
              onComplete: () => console.log("animate completed"),
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
          start: "center top",
          end: "400% bottom",
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
   * Text animation
   */
  useLayoutEffect(() => {
    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: textRef.current,
        start: "200% top",
        end: "400% bottom",
        scrub: 1,
      },
      opacity: 1,
      duration: 3,
      ease: "power2.inOut",
    });

    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: textRef.current,
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
  }, [textRef]);

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

  useLayoutEffect(() => {
    gsap.to(formRef.current, {
      scrollTrigger: {
        trigger: formRef.current,
        start: "700% top",
        end: "850% center",
        scrub: 1,
        markers: true,
      },
      opacity: 1,
      duration: 3,
      ease: "power2.out",
    });
  }, [formRef]);

  return (
    <>
      <div style={{ height: `${scrollPages * 100}vh` }}>
        <div className='fixed h-screen w-full overflow-hidden'>
          {/* Background Image */}
          <img
            ref={bgRef}
            className='fullscreenImage absolute'
            src='/leaf/bg-1080.webp'
            alt='background'
          />
          {/* Still leafs */}
          <img
            className='fullscreenImage absolute'
            src={group0Leaf0}
            alt='Leaf'
          />
          <img
            className='fullscreenImage absolute'
            src={group0Leaf1}
            alt='Leaf'
          />
          <img
            className='fullscreenImage absolute'
            src={group0Leaf2}
            alt='Leaf'
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
            alt='Leaf'
            data-group='5'
            data-position='bottom'
          />
          <img
            ref={(el) => group5Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group5Leaf2}
            alt='Leaf'
            data-group='5'
            data-position='right-bottom'
          />
          {/* Group 4 */}
          <img
            ref={(el) => group4Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group4Leaf1}
            alt='Leaf'
            data-group='4'
            data-position='left-bottom'
          />
          <img
            ref={(el) => group4Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group4Leaf2}
            alt='Leaf'
            data-group='4'
            data-position='right-bottom'
          />
          {/* Group 3 */}
          <img
            ref={(el) => group3Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group3Leaf1}
            alt='Leaf'
            data-group='3'
            data-position='left'
          />
          <img
            ref={(el) => group3Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group3Leaf2}
            alt='Leaf'
            data-group='3'
            data-position='right-top'
          />
          {/* Group 2 */}
          <img
            ref={(el) => group2Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group2Leaf1}
            alt='Leaf'
            data-group='2'
            data-position='bottom'
          />
          <img
            ref={(el) => group2Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group2Leaf2}
            alt='Leaf'
            data-group='2'
            data-position='left-bottom'
          />
          <img
            ref={(el) => group2Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group2Leaf3}
            alt='Leaf'
            data-group='2'
            data-position='left-top'
          />
          <img
            ref={(el) => group2Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group2Leaf4}
            alt='Leaf'
            data-group='2'
            data-position='right-top'
          />
          <img
            ref={(el) => group2Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group2Leaf5}
            alt='Leaf'
            data-group='2'
            data-position='right'
          />
          {/* Group 1 */}
          <img
            ref={(el) => group1Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group1Leaf1}
            alt='Leaf'
            data-group='1'
            data-position='left-bottom'
          />
          <img
            ref={(el) => group1Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group1Leaf2}
            alt='Leaf'
            data-group='1'
            data-position='left-top'
          />
          <img
            ref={(el) => group1Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group1Leaf3}
            alt='Leaf'
            data-group='1'
            data-position='right-bottom'
          />
          <img
            ref={(el) => group1Refs.current.push(el)}
            className='fullscreenImage absolute'
            src={group1Leaf4}
            alt='Leaf'
            data-group='1'
            data-position='right-top'
          />
          <img
            ref={bgSecRef}
            style={{ opacity: 0 }}
            className='fullscreenImage absolute'
            src='/leaf/bg-secondary.webp'
            alt='background'
          />
          {/* Text */}
          <div
            ref={textRef}
            className='fullscreenImage absolute'
            style={{
              opacity: 0,
              fontSize: "11rem",
              color: "rgb(15 23 42)",
              lineHeight: "0.9em",
            }}
          >
            <div className='flex h-full flex-col items-center justify-center'>
              <h1 className='text-center font-mottona'>
                <span className=''>Les amis de</span> <br />
                <span className='text-[12rem]'>Tobie</span>
              </h1>
            </div>
          </div>
          <div
            ref={formRef}
            className='fullscreenImage absolute'
            style={{ opacity: 0 }}
          >
            <div className='mt-20 flex h-full flex-col items-center justify-center gap-10 text-center'>
              <p className='font-["Caveat"] text-3xl leading-normal text-slate-900 drop-shadow-xl'>
                Tobie et ses amis sont sur le point d'arriver ! <br />
                Une aventure incroyable nous attend. <br />
                nous voulons que tu sois parmi les premiers à le savoir.
              </p>
              <div className='mb-10'>
                <InputForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaf;
