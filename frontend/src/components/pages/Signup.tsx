import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import api from "utils/api";
import { AxiosError } from "axios";
import Button from "components/Button";
import FormInput from "components/FormInput";

interface SignupInfo {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function Signup() {
  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetProperty = e.target.name as keyof SignupInfo;
    setSignupInfo((prev) => ({
      ...prev,
      [targetProperty]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    (async () => {
      try {
        const response = await api.post("users/signup", signupInfo);
        alert(response.data.message);
        navigate("/login");
      } catch (err) {
        if (err instanceof AxiosError)
          console.error(err.response?.data.message);
      }
    })();
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Header>회원가입</Header>
      <Wrapper>
        <FormInput name="username" nameString="유저명" onChange={handleChange} value={signupInfo.username} required />
      </Wrapper>
      <Wrapper>
        <FormInput name="email" nameString="이메일" onChange={handleChange} value={signupInfo.email} type="email" required />
      </Wrapper>
      <Wrapper>
        <FormInput name="password" nameString="비밀번호" onChange={handleChange} value={signupInfo.password} type="password" required />
      </Wrapper>
      <Wrapper>
        <FormInput name="passwordConfirm" nameString="비밀번호 확인" onChange={handleChange} value={signupInfo.passwordConfirm} type="password" required />
      </Wrapper>
      <ButtonContainer>
        <Button>회원가입</Button>
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

  margin: 10px;
`;

export default Signup;