// نسخ الحسابات من التطبيق الجوال

export interface MurabahaCalculation {
  id: string;
  salary: number;
  department: 'interior' | 'other';
  amount: number;
  interestRate: number;
  months: number;
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
  timestamp: number;
}

export function calculateMurabaha(
  salary: number,
  department: 'interior' | 'other',
  amount: number,
  interestRate: number,
  months: number
): Omit<MurabahaCalculation, 'id' | 'timestamp'> {
  // التحقق من صحة المدخلات
  if (salary <= 0 || amount <= 0 || interestRate < 0 || months <= 0) {
    throw new Error('جميع المدخلات يجب أن تكون أرقام موجبة');
  }

  // حساب الحد الأقصى للتمويل
  const maxFinance = department === 'interior' ? salary * 12 : salary * 10;
  if (amount > maxFinance) {
    throw new Error(`الحد الأقصى للتمويل هو ${formatCurrency(maxFinance)}`);
  }

  // حساب الفائدة والقسط
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalInterest = amount * monthlyInterestRate * months;
  const totalAmount = amount + totalInterest;
  const monthlyPayment = totalAmount / months;

  return {
    salary,
    department,
    amount,
    interestRate,
    months,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IQD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}
