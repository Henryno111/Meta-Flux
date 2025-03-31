import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import BudgetControl from './pages/BudgetControl';
import Rewards from './pages/Rewards';
import Transactions from './pages/Transactions';
import { WalletProvider } from './components/providers/wallet-provider';

// import Transactions from './pages/Transactions';
// import Budgeting from './pages/Budgeting';
// import Delegation from './pages/Delegation';
// import Rewards from './pages/Rewards';
// import Settings from './pages/Settings';

function App() {
  return (
  <WalletProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Budgeting" element={<BudgetControl />} />
        <Route path="/rewards" element={<Rewards />} />
         <Route path="/transactions" element={<Transactions />} />
         {/* <Route path="/budgeting" element={<Budgeting />} />
        <Route path="/delegation" element={<Delegation />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/settings" element={<Settings />} />   */}
      </Routes>
    </Router>
    </WalletProvider>
  );
}

export default App;