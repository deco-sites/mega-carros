export function toMoney(value: number) {
  const options = {
    style: "currency",
    currency: "BRL",
  };

  return value.toLocaleString("pt-BR", options);
}
