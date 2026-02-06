import { useState } from 'react';
import { calculateMurabaha, MurabahaCalculation } from '../lib/calculations';
import './MurabahaCalculator.css';

interface MurabahaCalculatorProps {
  onResultSelect: (result: MurabahaCalculation) => void;
}

export default function MurabahaCalculator({ onResultSelect }: MurabahaCalculatorProps) {
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState<'interior' | 'other'>('interior');
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [months, setMonths] = useState('');
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = calculateMurabaha(
        parseFloat(salary),
        department,
        parseFloat(amount),
        parseFloat(interestRate),
        parseInt(months)
      );

      const calculation: MurabahaCalculation = {
        id: Date.now().toString(),
        ...result,
        timestamp: Date.now(),
      };

      // حفظ في localStorage
      const history = JSON.parse(localStorage.getItem('murabahaHistory') || '[]');
      history.push(calculation);
      localStorage.setItem('murabahaHistory', JSON.stringify(history));

      onResultSelect(calculation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في الحساب');
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <h2>حاسبة المرابحة</h2>
        <form onSubmit={handleCalculate} className="calculator-form">
          <div className="form-group">
            <label htmlFor="salary">الراتب الشهري (دينار عراقي)</label>
            <input
              id="salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="أدخل الراتب الشهري"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">الجهة</label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value as 'interior' | 'other')}
            >
              <option value="interior">وزارة الداخلية + التربية</option>
              <option value="other">بقية الوزارات</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">مبلغ التمويل (دينار عراقي)</label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="أدخل مبلغ التمويل"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rate">سعر الفائدة السنوي (%)</label>
            <input
              id="rate"
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="أدخل سعر الفائدة"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="months">عدد الأشهر</label>
            <input
              id="months"
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              placeholder="أدخل عدد الأشهر"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn btn-primary">
            احسب المرابحة
          </button>
        </form>
      </div>

      <div className="info-card">
        <h3>معلومات مهمة</h3>
        <ul>
          <li>الحد الأقصى للتمويل: 12 راتب (داخلية + تربية)</li>
          <li>الحد الأقصى للتمويل: 10 رواتب (بقية الوزارات)</li>
          <li>يتم حساب الفائدة على أساس سنوي</li>
          <li>القسط الشهري يتم حسابه بالتساوي على جميع الأشهر</li>
        </ul>
      </div>
    </div>
  );
}
