import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AxiosError } from "axios";

import api from "utils/api";
import useLoggedInUser from "hooks/useLoggedInUser";
import Button from "components/Button";
import LinkButton from "components/LinkButton";
import FormInput from "components/FormInput";

interface LoginInfo {
  email: string;
  password: string;
}

function Login() {
  const loggedInUser = useLoggedInUser();
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetProperty = e.target.name as keyof LoginInfo;
    setLoginInfo((prev) => ({
      ...prev,
      [targetProperty]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      try {
        await api.post("users/login", loginInfo);

        // 로그인한 사용자 정보 저장
        try {
          const response = await api.get("users/me");
          loggedInUser.setUser(response.data);
        } catch (err) {
          if (err instanceof AxiosError)
            console.error(err.response?.data.message);
        }
      } catch (err) {
        if (err instanceof AxiosError)
          console.error(err.response?.data.message);
      }
    })();
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Header>로그인</Header>
      <Wrapper>
        <FormInput
          name="email"
          nameString="이메일"
          onChange={handleChange}
          value={loginInfo.email}
          type="email"
          required
        />
      </Wrapper>
      <Wrapper>
        <FormInput
          name="password"
          nameString="비밀번호"
          onChange={handleChange}
          value={loginInfo.password}
          type="password"
          required
        />
      </Wrapper>
      <ButtonContainer>
        <Button>로그인</Button>
        <LinkButton to="/signup">회원가입</LinkButton>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.form`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.bg[0]};
`;

const Header = styled.div`
  font-size: xx-large;

  margin-bottom: 50px;
`;

const Wrapper = styled.div`
  height: 40px;

  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  margin: 10px;
`;

export default Login;
