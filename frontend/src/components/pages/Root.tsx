import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { useCookies } from "react-cookie";
import { AxiosError } from "axios";

import GlobalStyle from "GlobalStyle";
import themes from "config/themes";
import { isAuthenticationRequired } from "utils/utils";
import api from "utils/api";
import useLoggedInUser from "hooks/useLoggedInUser";
import Nav from "components/Nav";
import useCurrentTheme from "hooks/useCurrentTheme";

function Root() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentTheme = useCurrentTheme();
  const [cookies] = useCookies(["token"]);
  const loggedInUser = useLoggedInUser();

  // Authentication
  useEffect(() => {
    if (isAuthenticationRequired(pathname)) {
      if (!cookies.token) {
        loggedInUser.setUser(null);
        navigate("/login");
        return;
      }

      (async () => {
        try {
          const response = await api.get("users/me");
          loggedInUser.setUser(response.data);
        } catch (err) {
          if (err instanceof AxiosError)
            console.error(err.response?.data.message);
        }
      })();

      return;
    }

    if (cookies.token) navigate("/browse")
    else if (pathname === '/') navigate("/login");
  }, [cookies, pathname]);

  return (
    <ThemeProvider theme={themes[currentTheme.id]}>
      <Container>
        <Nav />
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </Container>
      <GlobalStyle />
    </ThemeProvider>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const OutletContainer = styled.div`
  position: relative;

  width: auto;
  height: calc(100vh - 60px);
`;

export default Root;
