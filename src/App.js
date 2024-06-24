import Menu from './screens/Menu'
import SearchContextProvider from './context/SearchContext';
import { useState } from 'react';

function App() {
  
  const [currentUser, setCurrentUser] = useState({
    username: null,
    tagline: null,
    icon: null,
    exist: false,
  });

  return (
    <SearchContextProvider value={{currentUser, setCurrentUser}}>
      <Menu/>
    </SearchContextProvider>
  );
}

export default App;
