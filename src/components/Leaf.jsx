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
  const scrollPages = 4;

  // Refs
  const group1Refs = useRef([]);
  const group2Refs = useRef([]);
  const group3Refs = useRef([]);
  const group4Refs = useRef([]);
  const group5Refs = useRef([]);

  const tobieRef = useRef();
  const bgRef = useRef();

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
                markers: {
                  startColor: "blue",
                  endColor: "fuchsia",
                  fontSize: "1rem",
                  indent: 20,
                },
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
          start: "center 0",
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

    gsap.to(formRef.current, {
      scrollTrigger: {
        trigger: formRef.current,
        start: "500% top",
        end: "800% bottom",
        scrub: true,
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    });
  });

  return (
    <>
      <div style={{ height: `${scrollPages * 100}vh` }}>
        <div className='fixed h-screen w-full overflow-hidden bg-[#d6fdf9]'>
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
          {/* Text */}
          <div
            ref={textRef}
            className='fullscreenImage absolute'
            style={{ opacity: 0 }}
          >
            <div className='flex h-full flex-col items-center justify-center gap-11'>
              <h1 className='bg-gradient-to-br from-amber-900 via-yellow-900 to-lime-900 bg-clip-text text-center font-mottona text-9xl text-[15rem] text-transparent'>
                <span className='text-8xl'>Les amis de</span> <br />
                <span>Tobie</span>
              </h1>
              <div
                ref={formRef}
                className=''
                //  style={{ opacity: 0 }}
              >
                {/* <InputForm /> */}
              </div>
            </div>
          </div>
          {/* Form */}
        </div>
      </div>
    </>
  );
};

export default Leaf;
