import React, { useState } from "react";
import { ProductType } from "../../redux/check/types";

type PropsType = {
  setData: (data: any) => void
}

const CreateCheck: React.FC<PropsType> = ({ setData }) => {
  const [kioskName, setkioskName] = useState("");
  const [product, setproduct] = useState("");
  const [price, setprice] = useState(0);
  const [products, setProducts] = useState<Array<ProductType>>([]);
  const disabled = products.length !== 0;
  const [err, setError] = useState("");

  const onChangePrice = (e: any) => {
    const value = +e.target.value;
    if (value) {
      setprice(value)
    }
  }

  const addProduct = () => {
    if (!kioskName || !product) {
      setError("заполните все поля");
      return
    }

    const prod: ProductType = {
      id: Math.random().toString(16).slice(2),
      product,
      price,
    }

    const temp = [...products, prod];
    setProducts(temp);

    setData({
      data: temp,
      kioskName,
    });
    setproduct("");
    setprice(0);
  }

  return <>
    <form className="form">
      <div className="row">
        <div className="column"> <label>Киоск
          <input type="text" onChange={(e) => { setkioskName(e.target.value) }} value={kioskName} disabled={disabled} />
        </label></div>
        <div className="column">
          {err ? <span>{err}</span> : null}
        </div>
      </div>
      <div className="row">
        <div className="column"> <label>Продукт
          <input type="text" onChange={(e) => { setproduct(e.target.value) }} value={product} />
        </label></div>
        <div className="column"><label>Цена
          <input type="text" onChange={onChangePrice} value={price} />
        </label></div>
        <div className="column end">
          <button type="button" onClick={addProduct}>Добавить</button>
        </div>
      </div>

      {products.map((e) => {
        return <div key={e.id} className="row">
          <div className="column"> {e.product}</div>
          <div className="column">{e.price}</div>
        </div>
      })}
    </form>
  </>
}

export default CreateCheck;