import TabBar from "./components/TabBar";
import DashboardPage from "./pages/DashboardPage";
import TodoPage from "./pages/TodoPage";
import AiPage from "./pages/AiPage";
import DocPage from "./pages/DocPage";
import CalendarPage from "./pages/CalendarPage";

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0 overflow-auto">
        <div className="flex h-full w-full items-center justify-center">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/ai" element={<AiPage />} />
            <Route path="/doc" element={<DocPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </div>
      </div>

      {location.pathname === "/" && (
        <div className="fixed top-1/2 left-10 -translate-y-1/2">
          <div className="tabbar-overlay">
            <TabBar />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
