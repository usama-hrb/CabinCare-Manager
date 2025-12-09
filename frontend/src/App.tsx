import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import DashboardContent from "./components/DashboardContent";

function App() {
  const [showNewCabinModal, setShowNewCabinModal] = useState(false);
  const [selectedCabin, setSelectedCabin] = useState<number | null>(null);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <DashboardContent
        onNewCabin={() => setShowNewCabinModal(true)}
        onSelectCabin={(id) => setSelectedCabin(id)}
        selectedCabin={selectedCabin}
        showNewCabinModal={showNewCabinModal}
        onCloseNewCabinModal={() => setShowNewCabinModal(false)}
      />
    </div>
  );
}

export default App;
