import { useEffect, useRef } from "react";

// CallableFunction é uma interface incorporada em TypeScript que representa tipos de funções que podem ser chamadas
export function useInterval<c extends CallableFunction>(
  callback: c,
  delay: number | null
) {
  // useRef é usado para manter uma referência persistente ao callback
  const savedCallback = useRef<c>();

  // Este useEffect é chamado sempre que o callback muda.
  useEffect(() => {
    // Salva o callback atual na referência useRef
    savedCallback.current = callback;
  }, [callback]);

  // Este useEffect é chamado sempre que o delay muda.
  useEffect(() => {
    // Esta função é chamada a cada intervalo definido pelo delay
    function tick() {
      // Verifica se o callback atual está definido
      if (savedCallback.current) savedCallback.current();
    }

    // Se o delay não for nulo, configura um intervalo para chamar a função tick a cada delay
    if (delay !== null) {
      const id = setInterval(tick, delay);
      // Retorna uma função de limpeza que limpa o intervalo quando o componente é desmontado ou o delay muda
      return () => clearInterval(id);
    }
  }, [delay]);
}
