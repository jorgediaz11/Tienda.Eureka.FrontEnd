import { describe, expect, it } from "vitest";
import { resolveCoupon } from "./checkoutCouponService";

describe("resolveCoupon", () => {
  it("aplica descuento porcentual para EUREKA10", () => {
    const result = resolveCoupon("eureka10", 200);

    expect(result).toBeTruthy();
    expect(result.isValid).toBe(true);
    expect(result.code).toBe("EUREKA10");
    expect(result.discountAmount).toBe(20);
  });

  it("aplica descuento fijo para LECTOR5 sin superar el total", () => {
    const result = resolveCoupon("LECTOR5", 3);

    expect(result).toBeTruthy();
    expect(result.isValid).toBe(true);
    expect(result.discountAmount).toBe(3);
  });

  it("retorna invalido para cupon desconocido", () => {
    const result = resolveCoupon("DESCONOCIDO", 100);

    expect(result).toBeTruthy();
    expect(result.isValid).toBe(false);
  });
});
