import React from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

const DropZone = ({ onFiles, children, ...rest }) => {
  const { getRootProps, getInputProps } = useDropzone({
    noKeyboard: true,
    onDrop: onFiles,
  });
  return (
    <div {...getRootProps({ className: 'dropzone' })} {...rest}>
      <input {...getInputProps()} />
      {children}
      <p>Drag and drop some files here, or click to select files</p>
      <button className="btn btn-circle btn-circle-link">Browse </button>
    </div>
  );
};

DropZone.propTypes = {
  onFiles: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export { DropZone };
