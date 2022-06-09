import React from "react";
import "./CSS/App.css";
import { NamesProps } from "./types";

function App() {
  const [result, setResult] = React.useState(0);
  const [names, setNames] = React.useState<NamesProps>({
    firstName: "",
    secondName: "",
  });
  const [disable, setDisable] = React.useState(true);
  const [dsc, setDsc] = React.useState("");
  const handleClickToNext = () =>
    setResult(Math.round(Math.random() * (100 - 1) + 1));
  const handleClickToBack = () => {
    setResult(0);
    setNames({ firstName: "", secondName: "" });
    setDsc("");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNames({ ...names, [e.target.name]: e.target.value });
  React.useEffect(() => {
    if (names.firstName && names.secondName) setDisable(false);
    else setDisable(true);
  }, [names]);

  React.useEffect(() => {
    if (!disable) {
      if (result < 30)
        setDsc("Процент очень маленький, стоит найти кого-то другого");
      if (result < 70 && result > 30)
        setDsc("Процент уже неплохой, но будут проблемы с взаимопониманием");

      if (result > 70) setDsc("Процент великолепный, это ваш соулмейт");
    }
  }, [disable, result]);
  return (
    <div className="App">
      <h1 className="mainTitle">Проверь вашу совместимость</h1>
      {result <= 0 ? (
        <div className="checkWindow">
          <h2>Ваше имя:</h2>
          <input name="firstName" onChange={handleChange} />
          <h2>Имя вашего партнёра:</h2>
          <input name="secondName" onChange={handleChange} />
          <button disabled={disable} onClick={handleClickToNext}>
            Проверить
          </button>
        </div>
      ) : (
        <div className="resultWindow">
          <h1>{`Ваша совместимость: ${result}%`}</h1>
          <p>{dsc}</p>
          <button onClick={handleClickToBack}>Повторить</button>
        </div>
      )}
    </div>
  );
}

export default App;
