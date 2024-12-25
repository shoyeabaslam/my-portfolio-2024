import React from "react";

interface VideoProps {
  videoSrc: string;
  width?: number;
  height?: number;
  poster?: string;
}

const Video: React.FC<VideoProps> = ({
  videoSrc,
  width = 320,
  height = 240,
  poster,
}) => {
  return (
    <video
      autoPlay={true}
      width={width}
      height={height}
      poster={poster}
      loop={true}
      muted={true}
    >
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
