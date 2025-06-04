import React, { useState } from 'react';
import { BaseNode } from './baseNode';
import styled from 'styled-components';

const MergeContainer = styled.div`
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

const Label = styled.div`
  font-size: 12px;
  color: #666;
`;

export const MergeNode = ({ id, data }) => {
  const [mergeType, setMergeType] = useState(data?.mergeType || 'union');

  const mergeTypes = [
    { value: 'union', label: 'Union' },
    { value: 'intersection', label: 'Intersection' },
    { value: 'join', label: 'Join' },
    { value: 'concatenate', label: 'Concatenate' }
  ];

  return (
    <BaseNode
      id={id}
      type="Merge"
      inputs={[
        { id: 'input1', label: 'Input 1' },
        { id: 'input2', label: 'Input 2' }
      ]}
      outputs={[{ id: 'output', label: 'Merged Data' }]}
      width="250"
      height="150"
    >
      <MergeContainer>
        <Label>Merge Type:</Label>
        <Select
          value={mergeType}
          onChange={(e) => setMergeType(e.target.value)}
        >
          {mergeTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
      </MergeContainer>
    </BaseNode>
  );
}; 