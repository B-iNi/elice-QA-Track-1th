import styled from "styled-components";

interface Props {
  isHighlight?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

function Button({ isHighlight, onClick, children }: Props) {
  return (
    <StyledButton onClick={onClick} isHighlight={isHighlight}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button<{ isHighlight?: boolean }>`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  border: none;

  color: ${(props) => props.theme.text[0]};

  background-color: ${(props) => props.isHighlight
    ? props.theme.hl[1]
    : props.theme.main[1]
  };

  &:hover {
    background-color: ${(props) => props.isHighlight
    ? props.theme.hl[2]
    : props.theme.main[2]
  };
  }
`;

export default Button;