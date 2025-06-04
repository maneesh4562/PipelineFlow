import React, { useState } from 'react';
import { BaseNode } from './baseNode';
import styled from 'styled-components';

const ImagePreview = styled.div`
  width: 100%;
  height: 100px;
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const ImageInput = styled.input`
  width: 100%;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const ImageNode = ({ id, data }) => {
  const [imageUrl, setImageUrl] = useState(data?.imageUrl || '');

  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      type="Image"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[{ id: 'output', label: 'Output' }]}
      width="250"
      height="180"
    >
      <ImagePreview>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Preview" 
            style={{ maxWidth: '100%', maxHeight: '100%' }} 
          />
        ) : (
          'No image selected'
        )}
      </ImagePreview>
      <ImageInput
        type="text"
        value={imageUrl}
        onChange={handleImageChange}
        placeholder="Enter image URL"
      />
    </BaseNode>
  );
}; 