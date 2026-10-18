export const COUPONS = {
  EUREKA10: {
    code: "EUREKA10",
    label: "10% de descuento",
    type: "percentage",
    value: 10
  },
  LECTOR5: {
    code: "LECTOR5",
    label: "S/ 5 de descuento",
    type: "fixed",
    value: 5
  }
};

export function resolveCoupon(rawCode, amount) {
  const normalizedCode = String(rawCode || "").trim().toUpperCase();
  if (!normalizedCode) {
    return null;
  }

  const coupon = COUPONS[normalizedCode];
  if (!coupon) {
    return {
      code: normalizedCode,
      isValid: false,
      message: "El cupón ingresado no es válido."
    };
  }

  const baseAmount = Number(amount || 0);
  const rawDiscount = coupon.type === "percentage"
    ? baseAmount * (coupon.value / 100)
    : coupon.value;
  const discountAmount = Number(Math.min(baseAmount, rawDiscount).toFixed(2));

  return {
    ...coupon,
    isValid: true,
    discountAmount,
    message: `Cupón aplicado: ${coupon.label}`
  };
}
