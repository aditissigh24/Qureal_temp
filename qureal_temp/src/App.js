import React from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./_actions/Bot1";
import ImagePromptGenerator from "./components/ImagePromptGenerator";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ImagePromptGenerator />
  
    </QueryClientProvider>
  );
};

export default App;