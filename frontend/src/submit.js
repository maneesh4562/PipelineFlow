// submit.js

import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from './store';
import config from './config';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const StyledSubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1565c0;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${props => props.isError ? '#ffebee' : '#e8f5e9'};
  color: ${props => props.isError ? '#c62828' : '#2e7d32'};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1000;
  max-width: 300px;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const AlertTitle = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AlertContent = styled.div`
  font-size: 14px;
  line-height: 1.4;
`;

const AlertIcon = styled.span`
  font-size: 20px;
`;

export const SubmitButton = () => {
    const [alert, setAlert] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const nodes = useStore(state => state.nodes);
    const edges = useStore(state => state.edges);

    const handleSubmit = async () => {
        if (isSubmitting) return;
        
        setIsSubmitting(true);
        try {
            const response = await fetch(`${config.API_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: `pipeline=${encodeURIComponent(JSON.stringify({ nodes, edges }))}`
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Failed to validate pipeline');
            }

            setAlert({
                type: 'success',
                title: 'Pipeline Analysis',
                message: `Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag ? 'Yes' : 'No'}`
            });
        } catch (error) {
            setAlert({
                type: 'error',
                title: 'Error',
                message: error.message || 'Failed to submit pipeline'
            });
        } finally {
            setIsSubmitting(false);
        }

        // Clear alert after 5 seconds
        setTimeout(() => setAlert(null), 5000);
    };

    return (
        <>
            <ButtonContainer>
                <StyledSubmitButton 
                    onClick={handleSubmit}
                    disabled={nodes.length === 0 || isSubmitting}
                >
                    {isSubmitting ? 'Validating...' : 'Submit Pipeline'}
                </StyledSubmitButton>
            </ButtonContainer>
            {alert && (
                <AlertContainer isError={alert.type === 'error'}>
                    <AlertTitle>
                        <AlertIcon>
                            {alert.type === 'error' ? '⚠️' : '✓'}
                        </AlertIcon>
                        {alert.title}
                    </AlertTitle>
                    <AlertContent>
                        {alert.message.split('\n').map((line, i) => (
                            <div key={i}>{line}</div>
                        ))}
                    </AlertContent>
                </AlertContainer>
            )}
        </>
    );
};
