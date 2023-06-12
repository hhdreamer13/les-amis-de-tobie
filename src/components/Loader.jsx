import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap/all";

const Loader = () => {
  const containerRef = useRef();
  const colors = ["#ddd8b8", "#b3cbb9", "#84a9c0", "#6a66a3", "#58548e"];

  useLayoutEffect(() => {
    const children = containerRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      gsap.to(child, {
        y: `+=${(i + 6) * 5}`,
        ease: "sine.inOut",
        duration: 1,
        repeat: -1,
        yoyo: true,
        delay: i * 0.1,
      });
    }
  }, []);

  return (
    <div>
      <div
        ref={containerRef}
        className='flex h-screen items-center justify-center overflow-hidden'
      >
        {colors.map((color, index) => (
          <div
            key={index}
            className='m-2 h-5 w-5 rounded-full'
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
