import router from "config/router";
import { RouterProvider } from "react-router-dom";

import { LoggedInUserProvider } from "hooks/useLoggedInUser";
import { CurrentThemeProvider } from "hooks/useCurrentTheme";

function App() {
  return (
    <LoggedInUserProvider>
      <CurrentThemeProvider>
        <RouterProvider router={router} />
      </CurrentThemeProvider>
    </LoggedInUserProvider>
  );
}

export default App;
