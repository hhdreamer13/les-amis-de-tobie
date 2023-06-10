/* eslint-disable import/no-unresolved */
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

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

  const textRef = useRef();

  /**
   * Leaf exit animation
   */
  useLayoutEffect(() => {
    // Create a GSAP context
    let ctx = gsap.context(() => {
      // animation helper function
      const animate = (
        groupRefs,
        end,
        xPercentPos = 100,
        xPercentNeg = -100
      ) => {
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
              yPercent = -100;
            } else if (position.includes("bottom")) {
              yPercent = 100;
            }

            gsap.to(leaf, {
              scrollTrigger: {
                trigger: leaf,
                start: "top 0", // When the top of the element hits the bottom of the viewport
                end: end,
                scrub: 1,
                markers: true,
              },
              xPercent: xPercent,
              yPercent: yPercent,
            });
          }
        });
      };

      animate(group1Refs, "200% bottom");
      animate(group2Refs, "400% bottom");
      animate(group3Refs, "600% bottom", 200); // Use 200 for branch of group 3
      animate(group4Refs, "800% bottom");
      animate(group5Refs, "1000% bottom");
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
          start: "bottom 0",
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
        // onComplete: () => {
        //   // When Tobie animation is done, reveal the text
        //   gsap.fromTo(
        //     textRef.current,
        //     { opacity: 0 },
        //     {
        //       opacity: 1,
        //       duration: 1, // 1 second transition
        //     }
        //   );
        // },
      });
    }
  }, [tobieRef, bgRef, textRef]);

  return (
    <>
      <div style={{ height: `${scrollPages * 100}vh` }}>
        <div className='fixed w-full h-screen overflow-hidden'>
          {/* Background Image */}
          <img
            ref={bgRef}
            className='absolute fullscreenImage'
            src='/leaf/bg-1080.webp'
            alt='background'
          />
          {/* Still leafs */}
          <img
            className='absolute fullscreenImage'
            src={group0Leaf0}
            alt='Leaf'
          />
          <img
            className='absolute fullscreenImage'
            src={group0Leaf1}
            alt='Leaf'
          />
          <img
            className='absolute fullscreenImage'
            src={group0Leaf2}
            alt='Leaf'
          />
          {/* Tobie animation */}
          <canvas
            ref={tobieRef}
            className='absolute border-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-red-400'
            id='sprite'
          />
          <div
            ref={textRef}
            className='absolute fullscreenImage'
            // style={{ opacity: 0 }}
          >
            <h1 className='font-mottona text-8xl left-1/2 top-1/2'>
              Les amis de Tobie
            </h1>
          </div>

          {/* Group 5 */}
          <img
            ref={(el) => group5Refs.current.push(el)}
            className='absolute fullscreenImage'
            src={group5Leaf1}
            alt='Leaf'
            data-group='5'
            data-position='bottom'
          />
          <img
            ref={(el) => group5Refs.current.push(el)}
            className='absolute fullscreenImage'
            src={group5Leaf2}
            alt='Leaf'
            data-group='5'
            data-position='right-bottom'
          />
          {/* Group 4 */}
          <img
            ref={(el) => group4Refs.current.push(el)}
            className='absolute fullscreenImage'
            src={group4Leaf1}
            alt='Leaf'
            data-group='4'
            data-position='left-bottom'
          />
          <img
            ref={(el) => group4Refs.current.push(el)}
            className='absolute fullscreenImage'
            src={group4Leaf2}
            alt='Leaf'
            data-group='4'
            data-position='right-bottom'
          />
          {/* Group 3 */}
          <img
            ref={(el) => group3Refs.current.push(el)}
            className='absolute fullscreenImage'
            src={group3Leaf1}
            alt='Leaf'
            data-group='3'
            data-position='left'
          />
          <img
            ref={(el) => group3Refs.current.push(el)}
            className='absolute fullscreenImage'
            src={group3Leaf2}
            alt='Leaf'
            data-group='3'
            data-position='right'
          />
          {/* Group 2 */}
          <img
            ref={(el) => group2Refs.current.push(el)}
            className='absolute fullscreenImage'
            src={group2Leaf1}
            alt='Leaf'
            data-group='2'
            data-position='bottom'
          />
          <img
            ref={(el) => group2Refs.current.push(el)}
            className='absolute fullscreenImage'
            src={group2Leaf2}
            alt='Leaf'
            data-group='2'
            data-position='left-bottom'
          />
          <img
            ref={(el) => group2Refs.current.push(el)}
            className='absolute fullscreenImage'
            src={group2Leaf3}
            alt='Leaf'
            data-group='2'
            data-position='left-top'
          />
          <img
            ref={(el) => group2Refs.current.push(el)}
            className='absolute fullscreenImage'
            src={group2Leaf4}
            alt='Leaf'
            data-group='2'
            data-position='right-top'
          />
          <img
            ref={(el) => group2Refs.current.push(el)}
            className='absolute fullscreenImage'
            src={group2Leaf5}
            alt='Leaf'
            data-group='2'
            data-position='right'
          />
          {/* Group 1 */}
          <img
            ref={(el) => group1Refs.current.push(el)}
            className='absolute fullscreenImage'
            src={group1Leaf1}
            alt='Leaf'
            data-group='1'
            data-position='left-bottom'
          />
          <img
            ref={(el) => group1Refs.current.push(el)}
            className='absolute fullscreenImage'
            src={group1Leaf2}
            alt='Leaf'
            data-group='1'
            data-position='left-top'
          />
          <img
            ref={(el) => group1Refs.current.push(el)}
            className='absolute fullscreenImage'
            src={group1Leaf3}
            alt='Leaf'
            data-group='1'
            data-position='right-bottom'
          />
          <img
            ref={(el) => group1Refs.current.push(el)}
            className='absolute fullscreenImage'
            src={group1Leaf4}
            alt='Leaf'
            data-group='1'
            data-position='right-top'
          />
        </div>
      </div>
    </>
  );
};

export default Leaf;
