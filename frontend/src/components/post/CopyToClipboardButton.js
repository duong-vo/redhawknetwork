import React, { useRef } from 'react';
import copy from 'clipboard-copy';
import Button from '@mui/material/Button';

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
      <Button onClick={handleCopyToClipboard}>Share</Button>
    </div>
  );
};

export default CopyToClipboardButton;