import './SettingsPage.css';

interface SettingsPageProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function SettingsPage({ darkMode, onToggleDarkMode }: SettingsPageProps) {
  const handleNotificationToggle = () => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('شمس المصارف', {
          body: 'تم تفعيل الإشعارات بنجاح',
          icon: '🏦',
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification('شمس المصارف', {
              body: 'تم تفعيل الإشعارات بنجاح',
              icon: '🏦',
            });
          }
        });
      }
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h2>الإعدادات</h2>

        <div className="settings-section">
          <h3>المظهر</h3>
          <div className="setting-item">
            <div className="setting-label">
              <span className="setting-title">الوضع الليلي</span>
              <span className="setting-description">تبديل بين الوضع الفاتح والداكن</span>
            </div>
            <button
              className={`toggle-switch ${darkMode ? 'active' : ''}`}
              onClick={onToggleDarkMode}
            >
              <span className="toggle-circle"></span>
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3>الإشعارات</h3>
          <div className="setting-item">
            <div className="setting-label">
              <span className="setting-title">تفعيل الإشعارات</span>
              <span className="setting-description">احصل على تنبيهات بخصوص الأقساط</span>
            </div>
            <button className="btn btn-primary btn-small" onClick={handleNotificationToggle}>
              تفعيل
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3>حول التطبيق</h3>
          <div className="about-info">
            <div className="about-item">
              <span className="label">الإصدار</span>
              <span className="value">1.0.0</span>
            </div>
            <div className="about-item">
              <span className="label">المطور</span>
              <span className="value">فريق شمس المصارف</span>
            </div>
            <div className="about-item">
              <span className="label">الترخيص</span>
              <span className="value">جميع الحقوق محفوظة</span>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>المساعدة</h3>
          <div className="help-text">
            <h4>كيفية استخدام التطبيق:</h4>
            <ol>
              <li>أدخل راتبك الشهري</li>
              <li>اختر جهتك (داخلية أو أخرى)</li>
              <li>أدخل مبلغ التمويل المطلوب</li>
              <li>حدد سعر الفائدة والمدة</li>
              <li>اضغط على "احسب المرابحة"</li>
              <li>اعرض النتائج وشاركها أو حملها</li>
            </ol>

            <h4>ملاحظات مهمة:</h4>
            <ul>
              <li>الحد الأقصى للتمويل: 12 راتب (داخلية + تربية)</li>
              <li>الحد الأقصى للتمويل: 10 رواتب (بقية الوزارات)</li>
              <li>يتم حفظ جميع الحسابات تلقائياً في السجل</li>
              <li>يمكنك حذف أي حساب من السجل في أي وقت</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
