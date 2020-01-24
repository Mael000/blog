import styled from 'styled-components';
import { media } from '../utils/media';

export const Content = styled.div`
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  background-color: ${props => props.theme.colors.bg};
  form {
    p {
      label,
      input {
        display: block;
      }
      input {
        min-width: 275px;
      }
      textarea {
        resize: vertical;
        min-height: 150px;
        width: 100%;
      }
    }
  }
 
  }
`;
