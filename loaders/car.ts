import { Car } from "mc/types/Car.ts";

export default function loader(): Car {
  return {
    brand: "Cherry",
    name: "Corolla Cross",
    priceFrom: 134000.00,
    price: 115990.00,
  };
}
