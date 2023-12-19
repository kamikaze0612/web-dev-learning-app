import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/globalStyles";
import Instruction from "./ui/Instruction";
import InstructionProvider from "./context/InstructionContext";
import Homepage from "./ui/Homepage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <InstructionProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/lesson" element={<AppLayout />}>
            <Route index element={<Navigate to="step/1" replace />} />
            <Route path="step/:id" element={<Instruction />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        reverseOrder={false}
        position="top-center"
        toastOptions={{
          style: {
            padding: "12px 24px",
            fontSize: "14px",
            width: "max-content",
          },
        }}
      />
    </InstructionProvider>
  );
}

export default App;
