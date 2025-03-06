import styled from "styled-components";
import { User } from "../types";

interface Props {
  user: User;
  onClick?: () => void;
  onRemove?: (user: User) => void;
}

function Avatar({ user, onClick, onRemove }: Props) {
  const getShortName = () => {
    if (user.username === '') {
        return '';
    };

    const names = user.username.split(' ');
    if (names.length === 1) {
        return names[0][0];
    } else {
        return names[0][0] + names[1][0];
    };
  };

  return (
    <Container onClick={onClick}>
      <Picture>
        <h1>{getShortName()}</h1>
      </Picture>
      <Name>{user?.username}</Name>
      {onRemove && <RemoveBtn onClick={(e) => {e.preventDefault(); onRemove(user)}}>X</RemoveBtn>}
    </Container>
  );
}

const Container = styled.button`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  padding: 5px;
  gap: 5px;

  width: 150px;
  height: 50px;
  cursor: pointer;

  background: none;
  border: none;

  &:hover button {
    display: block;
  }
`;

const Picture = styled.div`
  width: 40px;
  height: 40px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: lightblue;
`;

const Name = styled.div``;

const RemoveBtn = styled.button`
  display: none;

  width: 20px;
  height: 20px;
  border-radius: 50%;
  
  border: none;

  position: absolute;
  top: 2%;
  right: 2%;

  text-align: center;
  font-size: 10px;

  background-color: ${(props) => props.theme.red[2]};
`;

export default Avatar;
