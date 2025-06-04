// textNode.js

import React, { useState, useEffect, useRef } from 'react';
import { BaseNode } from './baseNode';
import styled from 'styled-components';

const TextArea = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.4;
  overflow: hidden;
`;

const VariableTag = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  margin: 2px;
  display: inline-block;
`;

const VariablesContainer = styled.div`
  margin-top: 8px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
`;

const VariableLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Function to detect variables in text
  const detectVariables = (text) => {
    const variableRegex = /{{([a-zA-Z_][a-zA-Z0-9_]*)}}/g;
    const matches = [...text.matchAll(variableRegex)];
    return matches.map(match => match[1]);
  };

  // Update variables when text changes
  useEffect(() => {
    const newVariables = detectVariables(text);
    setVariables(newVariables);
  }, [text]);

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.max(60, textareaRef.current.scrollHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      type="Text"
      inputs={variables.map(variable => ({
        id: variable,
        label: variable
      }))}
      outputs={[{ id: 'output', label: 'Output' }]}
      width="300"
      height="auto"
    >
      <TextArea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text with variables like {{variable}}"
        onFocus={adjustTextareaHeight}
      />
      {variables.length > 0 && (
        <VariablesContainer>
          <VariableLabel>Detected Variables:</VariableLabel>
          {variables.map(variable => (
            <VariableTag key={variable}>{variable}</VariableTag>
          ))}
        </VariablesContainer>
      )}
    </BaseNode>
  );
};
