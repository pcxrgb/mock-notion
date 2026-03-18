import TabBar from "./components/TabBar";
import MockDashboard from "./components/MockDashboard";

function App() {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-auto">
        <div className="h-full w-full flex items-center justify-center">
          <MockDashboard />
        </div>
      </div>

      <div className="fixed top-1/2 left-10 -translate-y-1/2">
        <div className="tabbar-overlay">
          <TabBar />
        </div>
      </div>
    </div>
  );
}

export default App;
