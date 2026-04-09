import TabBar from "./components/TabBar";
import DashboardPage from "./pages/DashboardPage";
import TodoPage from "./pages/TodoPage";
import AiPage from "./pages/AiPage";
import DocPage from "./pages/DocPage";
import CalendarPage from "./pages/CalendarPage";

import { Routes, Route, useLocation } from "react-router-dom";
import { routes } from "./routes";

function App() {
  const location = useLocation();
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0 overflow-auto">
        <div className="flex h-full w-full items-center justify-center">
          <Routes>
            <Route path={routes.root} element={<DashboardPage />} />
            <Route path={routes.todo} element={<TodoPage />} />
            <Route path={routes.ai} element={<AiPage />} />
            <Route path={routes.doc} element={<DocPage />} />
            <Route path={routes.calendar} element={<CalendarPage />} />
          </Routes>
        </div>
      </div>

      {location.pathname === routes.root && (
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
