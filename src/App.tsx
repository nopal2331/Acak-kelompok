import React from "react";
import GroupRandomizer from "./pages/GroupRandomizer";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-700 to-red-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          🎲 Group Randomizer
        </h1>
        <GroupRandomizer />
      </div>
    </div>
  );
};

export default App;
