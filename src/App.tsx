import { Provider } from 'react-redux';
import './App.scss';
import { Router } from './router/Router';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
