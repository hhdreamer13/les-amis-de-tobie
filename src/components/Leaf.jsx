/* eslint-disable import/no-unresolved */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

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

// gsap.config({
//   autoSleep: 60,
//   force3D: true,
//   units: { left: "%", top: "%", rotation: "rad" },
// });

/**
 * Component
 */
const Leaf = () => {
  const scrollPages = 10;

  const group1Refs = useRef([]);
  const group2Refs = useRef([]);
  const group3Refs = useRef([]);
  const group4Refs = useRef([]);
  const group5Refs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animation for group 1
    group1Refs.current.forEach((leaf) => {
      const position = leaf.dataset.position;
      let xPercent = 0;
      let yPercent = 0;

      // Define final direction of movement based on position
      if (position.includes("left")) {
        xPercent = -100;
      } else if (position.includes("right")) {
        xPercent = 100;
      }

      if (position.includes("top")) {
        yPercent = -100;
      } else if (position.includes("bottom")) {
        yPercent = 100;
      }

      gsap.set(leaf, {
        xPercent: 0,
        yPercent: 0,
      });

      gsap.to(leaf, {
        scrollTrigger: {
          trigger: leaf,
          start: "top 0", // When the top of the element hits the bottom of the viewport
          end: "200% bottom", // When the bottom of the element hits the top of the viewport
          scrub: 1,
          markers: true,
        },
        xPercent: xPercent,
        yPercent: yPercent,
      });
    });

    // Animation for group 2
    group2Refs.current.forEach((leaf) => {
      const position = leaf.dataset.position;
      let xPercent = 0;
      let yPercent = 0;

      // Define final direction of movement based on position
      if (position.includes("left")) {
        xPercent = -100;
      } else if (position.includes("right")) {
        xPercent = 100;
      }

      if (position.includes("top")) {
        yPercent = -100;
      } else if (position.includes("bottom")) {
        yPercent = 100;
      }

      gsap.set(leaf, {
        xPercent: 0,
        yPercent: 0,
      });

      gsap.to(leaf, {
        scrollTrigger: {
          trigger: leaf,
          start: "top 0", // When the top of the element hits the bottom of the viewport
          end: "400% bottom", // When the bottom of the element hits the top of the viewport
          scrub: 1,
          markers: true,
        },
        xPercent: xPercent,
        yPercent: yPercent,
      });
    });

    // Animation for group 3
    group3Refs.current.forEach((leaf) => {
      const position = leaf.dataset.position;
      let xPercent = 0;
      let yPercent = 0;

      // Define final direction of movement based on position
      if (position.includes("left")) {
        xPercent = -100;
      } else if (position.includes("right")) {
        xPercent = 200;
      }

      if (position.includes("top")) {
        yPercent = -100;
      } else if (position.includes("bottom")) {
        yPercent = 100;
      }

      gsap.set(leaf, {
        xPercent: 0,
        yPercent: 0,
      });

      gsap.to(leaf, {
        scrollTrigger: {
          trigger: leaf,
          start: "top 0", // When the top of the element hits the bottom of the viewport
          end: "600% bottom", // When the bottom of the element hits the top of the viewport
          scrub: 1,
          markers: true,
        },
        xPercent: xPercent,
        yPercent: yPercent,
      });
    });

    // Animation for group 4
    group4Refs.current.forEach((leaf) => {
      const position = leaf.dataset.position;
      let xPercent = 0;
      let yPercent = 0;

      // Define final direction of movement based on position
      if (position.includes("left")) {
        xPercent = -100;
      } else if (position.includes("right")) {
        xPercent = 100;
      }

      if (position.includes("top")) {
        yPercent = -100;
      } else if (position.includes("bottom")) {
        yPercent = 100;
      }

      gsap.set(leaf, {
        xPercent: 0,
        yPercent: 0,
      });

      gsap.to(leaf, {
        scrollTrigger: {
          trigger: leaf,
          start: "top 0", // When the top of the element hits the bottom of the viewport
          end: "800% bottom", // When the bottom of the element hits the top of the viewport
          scrub: 1,
          markers: true,
        },
        xPercent: xPercent,
        yPercent: yPercent,
      });
    });

    // Animation for group 5
    group5Refs.current.forEach((leaf) => {
      const position = leaf.dataset.position;
      let xPercent = 0;
      let yPercent = 0;

      // Define final direction of movement based on position
      if (position.includes("left")) {
        xPercent = -100;
      } else if (position.includes("right")) {
        xPercent = 100;
      }

      if (position.includes("top")) {
        yPercent = -100;
      } else if (position.includes("bottom")) {
        yPercent = 100;
      }

      gsap.set(leaf, {
        xPercent: 0,
        yPercent: 0,
      });

      gsap.to(leaf, {
        scrollTrigger: {
          trigger: leaf,
          start: "top 0", // When the top of the element hits the bottom of the viewport
          end: "1000% bottom", // When the bottom of the element hits the top of the viewport
          scrub: 1,
          markers: true,
        },
        xPercent: xPercent,
        yPercent: yPercent,
      });
    });

    // And so on for the other groups...
  }, []);

  return (
    <>
      <div style={{ height: `${scrollPages * 100}vh` }}>
        <div className='fixed w-full h-screen overflow-hidden'>
          {/* Background Image */}
          <img
            className='absolute fullscreenImage'
            src='/leaf/bg-1080.webp'
            alt='background'
          />
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
