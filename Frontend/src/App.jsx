import React from "react";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";

// App conecta o layout compartilhado à página desta primeira etapa.
export default function App() {
  return (
    <AppLayout>
      <HomePage />
    </AppLayout>
  );
}
