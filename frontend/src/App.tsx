import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import DashboardContent from "./components/DashboardContent";

function App() {
  const [showNewCabinModal, setShowNewCabinModal] = useState(false);
  const [selectedCabin, setSelectedCabin] = useState(null);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <DashboardContent
        onNewCabin={() => setShowNewCabinModal(true)}
        onSelectCabin={() => setSelectedCabin}
        selectedCabin={selectedCabin}
        showNewCabinModal={showNewCabinModal}
        onCloseNewCabinModal={() => setShowNewCabinModal(false)}
      />
    </div>
  );
}

export default App;
