import { debounce } from "@/lib/debounce";
import { divideIntoRows } from "@/lib/divideIntoRows";
import Image, { StaticImageData } from "next/image";
import React, { CSSProperties, FC, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { skillIconimages } from "@/lib/skillsIcons";

interface BoxType {
  boxSize: number,
  skill?: ImagesType
}
interface ImagesType {
  image: StaticImageData,
  glowEffectColor: string
}

const Box: FC<BoxType> = ({ boxSize, skill }) => {
  const boxRef = useRef<HTMLDivElement>(null);



  return (
    <div
      ref={boxRef}
      style={{
        width: boxSize,
        height: boxSize,
        "--glowcolor": skill ? skill.glowEffectColor : "#ffffff33",
      } as CSSProperties}
      className="box-container shadow-sm rounded-md m-2 box-border p-2 flex-shrink-0 flex items-center justify-center"
    >
      {skill && (
        <Image
          width={500}
          height={500}
          alt="skill"
          src={skill.image}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

function SkillsWrapper() {
  const keybordRef = useRef<HTMLDivElement>(null);
  const [boxCount, setBoxCount] = useState(0)
  const [boxSize, setBoxSize] = useState(0)
  const [imagesGroup, setImagesGroup] = useState<ImagesType[][]>([[]]);

  useEffect(() => {
    if (boxCount > 0 && boxSize > 0) {
      const rows = divideIntoRows(skillIconimages, boxCount);
      setImagesGroup(rows);
    }
  }, [boxCount, boxSize]);

  useEffect(() => {
    const handleBoxSize = () => {
      if (keybordRef.current) {
        const offsetWidth = keybordRef.current.offsetWidth;
        if (offsetWidth < 400) {
          setBoxCount(5);
          setBoxSize(Math.floor(offsetWidth / 6));
        } else if (offsetWidth < 700) {
          setBoxCount(7);
          setBoxSize(Math.floor(offsetWidth / 8));
        } else {
          setBoxCount(9);
          setBoxSize(Math.floor(offsetWidth / 10));
        }
      }
    };
    const handleResize = () => {
      handleBoxSize()
    }
    const debouncedResize = debounce(handleResize, 200);
    window.addEventListener("resize", debouncedResize);
    handleBoxSize();
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [])

  useEffect(() => {
    const handleAnimation = (entries: any[], observer: { disconnect: () => void; }) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(".box-container", {
            opacity: 0,
            x: -20,
          }, {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.2,
            ease: "power2.inOut"
          });
          observer.disconnect();
        }
      });
    };

    const observer = new IntersectionObserver(handleAnimation, {
      root: null,
      threshold: 0.5,
    });

    const boxContainers = document.querySelectorAll(".box-container");
    boxContainers.forEach(container => observer.observe(container));
    return () => {
      observer.disconnect();
    };
  }, [imagesGroup]);

  return (
    <div ref={keybordRef} className="skills-wrapper flex flex-col items-center h-full w-full overflow-hidden md:py-5">
      {
        boxCount > 7 && (
          <div className="flex sm:-translate-x-9">
            {
              Array.from({ length: boxCount }).map((_, index) => (
                <Box key={index} boxSize={boxSize} />
              ))
            }
          </div>
        )
      }
      {imagesGroup.length > 0 &&
        imagesGroup.map((imageRow, rowIndex) => (
          <div key={rowIndex} className={`flex ${rowIndex % 2 === 1 ? 'sm:-translate-x-10' : 'translate-x-0'}`}>
            {imageRow.map((image, colIndex) => (
              <Box key={colIndex} boxSize={boxSize} skill={image} />
            ))}
          </div>
        ))}
    </div>
  );
}

export default SkillsWrapper;
