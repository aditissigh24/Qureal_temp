import logo from "./logo.svg";
import "./App.css";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./_actions/bot";
import AIImageGenerator from "./components/AIImageGenerator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <QueryClientProvider client={queryClient}>
          <AIImageGenerator />
        </QueryClientProvider>
      </header>
    </div>
  );
}

export default App;
