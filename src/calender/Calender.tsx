import './calander.css';

export function Calender() {
  return (
    <section className="calender-section">
      <h1 className="month-circle">12</h1>
      <img className="calender-img " src='/calender_12.png' alt="웨딩달력" />
      <p className="date-text">2021년 12월 04일 토요일 오후 5시</p>
    </section>
  )
}