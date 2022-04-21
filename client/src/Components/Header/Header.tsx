import { useDispatch } from "react-redux";
import { useModalWindow } from "../../providers/ModalWindow/Modal/modal";
import { CheckActions } from "../../redux/check/check-Reducer";
import { CheckType } from "../../redux/check/types";
import CreateCheck from "../Create/CreateCheck";
import { parser } from "./dto";

const Navbar = () => {
  const { show, setData } = useModalWindow();
  const dispatch = useDispatch();

  const addCheck = (prod: CheckType) => {
    dispatch(CheckActions.addCheck(prod));
  }
  const handleShow = () => {
    show({
      onApply: (value) => {
        if (!value)
          return false;

        const data = parser(value);
        addCheck(data)
        setData(null);
        return true;
      },
      title: "Новый чек",
      dialogText: <CreateCheck setData={setData} />
    });
  }

  return <header className="header" >
    <h1 className="m-1">Добавить новый чек</h1>
    <button className='btn btn-success' onClick={handleShow}>Добавить </button>
  </header>
}

export default Navbar;