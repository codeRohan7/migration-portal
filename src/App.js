import logo from './logo.svg';
import './App.css';
import Migrate from './MigratePortal/Migrate';
import Wallet from './MigratePortal/wallets';
import Header from './MigratePortal/Header';
import Footer from './MigratePortal/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Migrate/>
      {/* <Wallet/> */}
    </div>
  );
}

export default App;
