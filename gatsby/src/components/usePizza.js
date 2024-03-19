import { useState, useContext } from 'react';
import OrderContext from './OrderContext';

export default function usePizza() {
  const [order, setOrder] = useContext(OrderContext);

  const [loading, setLoading] = useState(false);

  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }

  async function submitOrder(e, inputs) {
    e.preventDefault();
    setLoading(true);
    const body = {
      order,
      email: inputs.email,
    };
    // Wysyłanie żądania do serwera...
  }

  return {
    addToOrder,
    removeFromOrder,
    submitOrder,
  };
}
