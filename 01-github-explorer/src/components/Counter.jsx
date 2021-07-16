import { useState } from "react";

//imutabilidade

//usuários ['diego3g', 'dieegosf', 'danileap']
// usuarios.push('rafacanrda')

export function Counter() {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter+1)
  }

  return (
    <div>
      <h2>{counter}</h2>
      <button
        onClick={increment}
        type="button">Increment</button>
    </div>
  )
}