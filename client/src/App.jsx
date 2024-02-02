import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/globalStyles";
import InstructionProvider from "./context/InstructionContext";
import AppLayout from "./ui/AppLayout";
import Instruction from "./ui/Instruction";
import Homepage from "./ui/Homepage";
import Login from "./features/authentication/Login";

function App() {
  return (
    <InstructionProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/login" />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/lesson" element={<AppLayout />}>
            <Route index element={<Navigate to="step/1" replace />} />
            <Route path="step/:id" element={<Instruction />} />
          </Route>
          <Route path="/login" element={<Login />} />
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
