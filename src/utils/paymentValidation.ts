export const validatePaymentAmount = (amount: any): number => {
  let validAmount = 0;
  
  if (amount !== null && amount !== undefined) {
    if (typeof amount === 'number') {
      validAmount = amount;
    } else if (typeof amount === 'string') {
      const parsed = parseFloat(amount);
      if (!isNaN(parsed)) {
        validAmount = parsed;
      }
    }
  }

  if (validAmount <= 0) {
    throw new Error(`Invalid amount: ${amount}. Amount must be greater than 0`);
  }

  return validAmount;
};

export const validatePayment = (payment: any, userId: string) => {
  console.log('Validating payment:', payment);
  
  const amount = validatePaymentAmount(payment.amount);
  
  const validatedPayment = {
    ...payment,
    coach_id: userId,
    amount: amount,
    payment_date: payment.payment_date || new Date().toISOString(),
    payment_method: payment.payment_method || 'other',
    status: payment.status || 'pending',
    client_id: payment.client_id || null
  };

  console.log('Validated payment:', validatedPayment);
  return validatedPayment;
};