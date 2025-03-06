import Avatar from "components/Avatar";
import Button from "components/Button";
import themes from "config/themes";
import GlobalStyle from "GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import { User } from "types";

function ComponentTest() {
    const testUser: User = {
        _id: 'testId',
        username: 'John Doe',
        email: 'john.doe@email.com',
    };

    return (
        <ThemeProvider theme={themes[0]}>
            <Wrapper>
                <h1>Avatar</h1>
                <Avatar user={testUser} />
                <Avatar user={testUser} onClick={() => alert("onClick 호출")}/>
                <Avatar user={testUser} onRemove={() => alert("onRemove 호출")}/>
            </Wrapper>

            <Wrapper>
                <h1>Button</h1>
                <Button onClick={() => alert("onClick 호출")}>
                    테스트
                </Button>
            </Wrapper>


            <GlobalStyle />
        </ThemeProvider>
    );
}

const Wrapper = styled.div`
    width: 100%;

    padding: 10px;
    gap: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default ComponentTest;