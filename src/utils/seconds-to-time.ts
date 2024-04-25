export const secondsToTime = (secondsProps: number): string => {
  // Função local que adiciona um zero à esquerda se o número for menor que 10
  const zeroLeft = (number: number) =>
    Math.floor(number).toString().padStart(2, "0");

  // Calcula os minutos dividindo o número de segundos por 60 e pegando o resto da divisão
  // Depois, formata com zero à esquerda se necessário
  const minutes = zeroLeft((secondsProps / 60) % 60);

  // Calcula os segundos pegando o resto da divisão por 60
  // Depois, formata com zero à esquerda se necessário
  const seconds = zeroLeft((secondsProps % 60) % 60);

  // Retorna a string formatada como "MM:SS"
  return `${minutes}:${seconds}`;
};
