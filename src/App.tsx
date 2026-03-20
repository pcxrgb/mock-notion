import TabBar from "./components/TabBar";
import MockDashboard from "./components/MockDashboard";
import TodoPage from "./components/TodoPage";
import AiPage from "./components/AiPage";
import DocPage from "./components/DocPage";
import CalendarPage from "./components/CalendarPage";

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-auto">
        <div className="h-full w-full flex items-center justify-center">
          <Routes>
            <Route path="/" element={<MockDashboard />} />
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
