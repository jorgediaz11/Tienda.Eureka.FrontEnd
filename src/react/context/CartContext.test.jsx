import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";

const productA = {
  id: "book-a",
  title: "Libro A",
  price: 20,
  image: "a.png"
};

const productB = {
  id: "book-b",
  title: "Libro B",
  price: 5,
  image: "b.png"
};

function CartHarness() {
  const { items, itemCount, subtotal, addItem, removeItem, clearCart } = useCart();

  return (
    <div>
      <p data-testid="items">{items.length}</p>
      <p data-testid="itemCount">{itemCount}</p>
      <p data-testid="subtotal">{subtotal}</p>
      <button type="button" onClick={() => addItem(productA, 2)}>add-a-2</button>
      <button type="button" onClick={() => addItem(productA, 1)}>add-a-1</button>
      <button type="button" onClick={() => addItem(productB, 3)}>add-b-3</button>
      <button type="button" onClick={() => removeItem(productA.id)}>remove-a</button>
      <button type="button" onClick={clearCart}>clear</button>
    </div>
  );
}

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("acumula cantidades y calcula subtotal", () => {
    render(
      <CartProvider>
        <CartHarness />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("add-a-2"));
    fireEvent.click(screen.getByText("add-a-1"));
    fireEvent.click(screen.getByText("add-b-3"));

    expect(screen.getByTestId("items").textContent).toBe("2");
    expect(screen.getByTestId("itemCount").textContent).toBe("6");
    expect(screen.getByTestId("subtotal").textContent).toBe("75");
  });

  it("elimina y limpia correctamente el carrito", () => {
    render(
      <CartProvider>
        <CartHarness />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("add-a-2"));
    fireEvent.click(screen.getByText("add-b-3"));
    fireEvent.click(screen.getByText("remove-a"));

    expect(screen.getByTestId("items").textContent).toBe("1");
    expect(screen.getByTestId("itemCount").textContent).toBe("3");
    expect(screen.getByTestId("subtotal").textContent).toBe("15");

    fireEvent.click(screen.getByText("clear"));
    expect(screen.getByTestId("items").textContent).toBe("0");
    expect(screen.getByTestId("itemCount").textContent).toBe("0");
    expect(screen.getByTestId("subtotal").textContent).toBe("0");
  });
});
