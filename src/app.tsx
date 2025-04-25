import { render } from "preact";
import { setAuth } from "./lib/auth";
import Main from "./components/main";
export function App() {
  setAuth();
  return <Main />;
}

render(<App />, document.querySelector("body"));
