import TabBar from "./components/TabBar";

function App() {
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <div className="basis-[15%] shrink-0 h-full bg-white flex items-center justify-center">
        <TabBar />
      </div>
      <div className="flex-1 h-full bg-gray-100" />
    </div>
  );
}

export default App;
