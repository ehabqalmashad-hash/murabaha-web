import { MurabahaCalculation, formatCurrency } from '../lib/calculations';
import './ResultsDisplay.css';

interface ResultsDisplayProps {
  result: MurabahaCalculation;
  onBack: () => void;
}

export default function ResultsDisplay({ result, onBack }: ResultsDisplayProps) {
  const handleShare = () => {
    const text = `
شمس المصارف - نتائج حساب المرابحة
=====================================
الراتب الشهري: ${formatCurrency(result.salary)}
الجهة: ${result.department === 'interior' ? 'وزارة الداخلية + التربية' : 'بقية الوزارات'}
مبلغ التمويل: ${formatCurrency(result.amount)}
سعر الفائدة: ${result.interestRate}%
عدد الأشهر: ${result.months}

النتائج:
--------
القسط الشهري: ${formatCurrency(result.monthlyPayment)}
إجمالي الفائدة: ${formatCurrency(result.totalInterest)}
المبلغ الكلي: ${formatCurrency(result.totalAmount)}
    `.trim();

    if (navigator.share) {
      navigator.share({
        title: 'نتائج المرابحة',
        text: text,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text);
      alert('تم نسخ النتائج إلى الحافظة');
    }
  };

  const handleDownload = () => {
    const text = `
شمس المصارف - نتائج حساب المرابحة
=====================================
الراتب الشهري: ${formatCurrency(result.salary)}
الجهة: ${result.department === 'interior' ? 'وزارة الداخلية + التربية' : 'بقية الوزارات'}
مبلغ التمويل: ${formatCurrency(result.amount)}
سعر الفائدة: ${result.interestRate}%
عدد الأشهر: ${result.months}

النتائج:
--------
القسط الشهري: ${formatCurrency(result.monthlyPayment)}
إجمالي الفائدة: ${formatCurrency(result.totalInterest)}
المبلغ الكلي: ${formatCurrency(result.totalAmount)}

التاريخ: ${new Date(result.timestamp).toLocaleDateString('ar-IQ')}
    `.trim();

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', `murabaha-${result.id}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="results-container">
      <button className="btn-back" onClick={onBack}>
        ← رجوع
      </button>

      <div className="results-card">
        <h2>نتائج حساب المرابحة</h2>

        <div className="results-summary">
          <div className="summary-item">
            <span className="label">الراتب الشهري</span>
            <span className="value">{formatCurrency(result.salary)}</span>
          </div>
          <div className="summary-item">
            <span className="label">مبلغ التمويل</span>
            <span className="value">{formatCurrency(result.amount)}</span>
          </div>
          <div className="summary-item">
            <span className="label">سعر الفائدة</span>
            <span className="value">{result.interestRate}%</span>
          </div>
          <div className="summary-item">
            <span className="label">المدة</span>
            <span className="value">{result.months} شهر</span>
          </div>
        </div>

        <div className="results-main">
          <div className="result-item highlight">
            <span className="label">القسط الشهري</span>
            <span className="value">{formatCurrency(result.monthlyPayment)}</span>
          </div>
          <div className="result-item">
            <span className="label">إجمالي الفائدة</span>
            <span className="value">{formatCurrency(result.totalInterest)}</span>
          </div>
          <div className="result-item">
            <span className="label">المبلغ الكلي</span>
            <span className="value">{formatCurrency(result.totalAmount)}</span>
          </div>
        </div>

        <div className="results-actions">
          <button className="btn btn-primary" onClick={handleShare}>
            📤 مشاركة
          </button>
          <button className="btn btn-secondary" onClick={handleDownload}>
            💾 تحميل
          </button>
        </div>
      </div>

      <div className="results-table">
        <h3>جدول الأقساط</h3>
        <table>
          <thead>
            <tr>
              <th>الشهر</th>
              <th>القسط</th>
              <th>الفائدة</th>
              <th>الرصيد المتبقي</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.min(result.months, 12) }).map((_, i) => {
              const month = i + 1;
              const monthlyPayment = result.monthlyPayment;
              const monthlyInterest = (result.amount * (result.interestRate / 100 / 12));
              const principal = monthlyPayment - monthlyInterest;
              const remainingBalance = result.amount - (principal * month);

              return (
                <tr key={month}>
                  <td>{month}</td>
                  <td>{formatCurrency(monthlyPayment)}</td>
                  <td>{formatCurrency(monthlyInterest)}</td>
                  <td>{formatCurrency(Math.max(0, remainingBalance))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {result.months > 12 && (
          <p className="table-note">... وهكذا حتى الشهر {result.months}</p>
        )}
      </div>
    </div>
  );
}
