import moment from 'moment-ru';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Footer from './Components/Footer/Footer';
import Main from './Components/Main/Main';
import Header from './Components/Header/Header';
import data from "./data/data.json";
import { CheckActions } from './redux/check/check-Reducer';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    moment.locale("ru")
    // @ts-ignore: Unreachable code error
    dispatch(CheckActions.setData(data.data.cheques));
  }, []);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
