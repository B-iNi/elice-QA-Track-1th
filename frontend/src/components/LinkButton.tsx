import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  to: string;
  isHighlight?: boolean;
  children?: React.ReactNode;
}

function LinkButton({ to, isHighlight, children }: Props) {
  return (
    <StyledLink to={to} isHighlight={isHighlight}>
      {children}
    </StyledLink>
  )
}

const StyledLink = styled(Link)<{ isHighlight?: boolean }>`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  border: none;

  color: ${(props) => props.theme.text[0]};

  text-decoration: none;
  background: none;

  background-color: ${(props) => props.isHighlight
    ? props.theme.hl[1]
    : props.theme.main[1]
  };
  &:hover {
    background-color: ${(props) => props.isHighlight
    ? props.theme.hl[2]
    : props.theme.main[2]
    };
    cursor: pointer;
  }
`;

export default LinkButton;