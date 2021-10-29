import { BrowserRouter as Router } from "react-router-dom";
import { ScreenRouting } from "./screens/ScreenRouting";

function App() {
  return (
    <Router>
      <div className={`h-full w-full`}>
        <ScreenRouting />
      </div>
    </Router>
  );
}

export default App;
