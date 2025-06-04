import React from 'react';
import { Handle, Position } from 'reactflow';
import styled from 'styled-components';

const NodeContainer = styled.div`
  width: ${props => props.width || '200px'};
  height: ${props => props.height || '80px'};
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
`;

const NodeHeader = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

const NodeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BaseNode = ({
  id,
  type,
  data,
  inputs = [],
  outputs = [],
  width,
  height,
  children
}) => {
  return (
    <NodeContainer width={width} height={height}>
      <NodeHeader>{type}</NodeHeader>
      <NodeContent>
        {children}
      </NodeContent>
      
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-input-${index}`}
          style={{ top: `${((index + 1) * 100) / (inputs.length + 1)}%` }}
        />
      ))}

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={`${id}-output-${index}`}
          style={{ top: `${((index + 1) * 100) / (outputs.length + 1)}%` }}
        />
      ))}
    </NodeContainer>
  );
}; 