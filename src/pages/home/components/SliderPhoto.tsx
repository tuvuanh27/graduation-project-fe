import React from "react";

type SliderPhotoProps = {
  photoUrl: string;
  photoId: number;
  showPhoto: boolean;
  stationaryPhoto?: boolean;
};

const SliderPhoto: React.FC<SliderPhotoProps> = (props) => {
  const { photoUrl, photoId, showPhoto } = props;
  return (
    <div className={`splash-individual-photo`}>
      <img
        className={`splash-photo-${photoId} ${
          showPhoto ? "show-photo" : "leaving-photo"
        }`}
        src={photoUrl}
        alt=""
      />
    </div>
  );
};

export default SliderPhoto;
