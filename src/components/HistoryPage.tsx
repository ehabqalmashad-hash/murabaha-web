import { useState, useEffect } from 'react';
import { MurabahaCalculation, formatCurrency } from '../lib/calculations';
import './HistoryPage.css';

interface HistoryPageProps {
  onSelectResult: (result: MurabahaCalculation) => void;
}

export default function HistoryPage({ onSelectResult }: HistoryPageProps) {
  const [history, setHistory] = useState<MurabahaCalculation[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('murabahaHistory');
    if (saved) {
      setHistory(JSON.parse(saved).reverse());
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('murabahaHistory', JSON.stringify(updated.reverse()));
  };

  const handleClearAll = () => {
    if (confirm('هل تريد حذف جميع السجلات؟')) {
      setHistory([]);
      localStorage.removeItem('murabahaHistory');
    }
  };

  if (history.length === 0) {
    return (
      <div className="history-empty">
        <div className="empty-icon">📋</div>
        <h2>لا توجد حسابات سابقة</h2>
        <p>ابدأ بحساب مرابحة جديدة لحفظها في السجل</p>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>سجل الحسابات</h2>
        <button className="btn btn-danger btn-small" onClick={handleClearAll}>
          🗑️ حذف الكل
        </button>
      </div>

      <div className="history-list">
        {history.map((item) => (
          <div key={item.id} className="history-item">
            <div className="history-item-content" onClick={() => onSelectResult(item)}>
              <div className="history-item-main">
                <div className="history-item-title">
                  {formatCurrency(item.amount)} - {item.months} شهر
                </div>
                <div className="history-item-subtitle">
                  {new Date(item.timestamp).toLocaleDateString('ar-IQ')}
                </div>
              </div>
              <div className="history-item-result">
                <div className="history-item-payment">
                  {formatCurrency(item.monthlyPayment)}
                </div>
                <div className="history-item-label">القسط الشهري</div>
              </div>
            </div>
            <button
              className="btn-delete"
              onClick={() => handleDelete(item.id)}
              title="حذف"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
