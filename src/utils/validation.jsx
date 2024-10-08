import * as Yup from 'yup';

export const expenseValidationSchema = Yup.object().shape({
  description: Yup.string()
    .required('Description is required')
    .min(3, 'Description must be at least 3 characters')
    .max(100, 'Description must not exceed 100 characters'),
  
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .max(1000000, 'Amount must not exceed 1,000,000'),
  
  date: Yup.date()
    .required('Date is required')
    .max(new Date(), 'Date cannot be in the future'),
  
  category: Yup.string()
    .required('Category is required')
    .oneOf(['Food', 'Transportation', 'Entertainment', 'Utilities', 'Other'], 'Invalid category'),
  
  paymentMethod: Yup.string()
    .required('Payment method is required')
    .oneOf(['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer'], 'Invalid payment method'),
});

export const validateExpenseInput = async (expenseData) => {
  try {
    await expenseValidationSchema.validate(expenseData, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    const errors = error.inner.reduce((acc, err) => {
      acc[err.path] = err.message;
      return acc;
    }, {});
    return { isValid: false, errors };
  }
};