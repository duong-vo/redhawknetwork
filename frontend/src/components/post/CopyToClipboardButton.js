import React, { useRef } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../../assets/icons8-share-100.png';

const CopyToClipboardButton = ({ postLink }) => {
  const linkRef = useRef(null);

  const handleCopyToClipboard = () => {
    if (linkRef.current) {
      copy(postLink);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={postLink}
        readOnly
        ref={linkRef}
        style={{ position: 'absolute', left: '-9999px' }} // Hide the input off-screen
      />
      <img
        src={shareIcon}
        alt="Share"
        style={{ cursor: 'pointer', height: '24px' }} // Adjust the height as needed
        onClick={handleCopyToClipboard}
      />
    </div>
  );
};

export default CopyToClipboardButton;