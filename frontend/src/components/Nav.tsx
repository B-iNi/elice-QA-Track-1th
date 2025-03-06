import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";

import Avatar from "./Avatar";
import useLoggedInUser from "hooks/useLoggedInUser";
import useCurrentTheme from "hooks/useCurrentTheme";
import themes from "config/themes";
import LinkButton from "./LinkButton";
import Button from "./Button";

function Nav() {
  const navigate = useNavigate();
  const [_, __, removeCookie] = useCookies(["token"]);
  const loggedInUser = useLoggedInUser();
  const currentTheme = useCurrentTheme();

  const logoutHandler = () => removeCookie("token");
  const onThemeChange = () => {
    if (currentTheme.id === themes.length - 1) currentTheme.setId(0);
    else currentTheme.setId(currentTheme.id + 1);
  };

  return (
    <Container>
      <SubContainer>
        <LinkButton to="/browse">일정 열람</LinkButton>
        <LinkButton to="/create">일정 생성</LinkButton>
      </SubContainer>

      <SubContainer>
        {loggedInUser.user ? (
          <>
            <AvatarContainer>
              <Avatar user={loggedInUser.user} onClick={() => navigate("/browse")} />
            </AvatarContainer>
            <Button onClick={logoutHandler}>로그아웃</Button>
          </>
        ) : (
          <LinkButton to="/login">로그인</LinkButton>
        )}
        <Button onClick={onThemeChange}>
          테마 변경
        </Button>
      </SubContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding-left: 20px;
  padding-right: 20px;

  width: auto;
  height: 60px;

  background-color: ${(props) => props.theme.main[1]};
`;

const AvatarContainer = styled.div`
  width: 150px;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => props.theme.main[2]};
  }
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export default Nav;
