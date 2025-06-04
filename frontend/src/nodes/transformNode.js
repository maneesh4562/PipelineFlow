import React, { useState } from 'react';
import { BaseNode } from './baseNode';
import styled from 'styled-components';

const TransformContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Label = styled.div`
  font-size: 12px;
  color: #666;
`;

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'map');
  const [expression, setExpression] = useState(data?.expression || '');

  const transformTypes = [
    { value: 'map', label: 'Map' },
    { value: 'reduce', label: 'Reduce' },
    { value: 'flatten', label: 'Flatten' },
    { value: 'pivot', label: 'Pivot' },
    { value: 'custom', label: 'Custom' }
  ];

  return (
    <BaseNode
      id={id}
      type="Transform"
      inputs={[{ id: 'input', label: 'Data Input' }]}
      outputs={[{ id: 'output', label: 'Transformed Data' }]}
      width="250"
      height="180"
    >
      <TransformContainer>
        <Label>Transform Type:</Label>
        <Select
          value={transformType}
          onChange={(e) => setTransformType(e.target.value)}
        >
          {transformTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
        <Label>Transform Expression:</Label>
        <Input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder={`Enter ${transformType} expression`}
        />
      </TransformContainer>
    </BaseNode>
  );
}; 