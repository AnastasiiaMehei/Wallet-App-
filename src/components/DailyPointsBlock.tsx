import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGift } from '@fortawesome/free-solid-svg-icons';
import { calculateDailyPoints, getCurrentSeason, formatPoints } from '../utils/pointsCalculator';
import './DailyPointsBlock.css';

interface DailyPointsBlockProps {
  points: number;
}

const DailyPointsBlock: React.FC<DailyPointsBlockProps> = ({ points }) => {
  const today = new Date();
  const season = getCurrentSeason(today);
  const calculatedPoints = calculateDailyPoints(today);

  // Для демонстрації використовуємо передані бали, але показуємо розрахунок
  const displayPoints = points;
  const formattedPoints = formatPoints(displayPoints);

  // Показуємо розподіл: базові бали сезону + накопичені
  const seasonBasePoints = calculatedPoints;
  const accumulatedBonus = Math.max(0, displayPoints - seasonBasePoints);

  const getProgressPercentage = () => {
    // Максимум 500 балів для прогрес бару
    return Math.min((displayPoints / 500) * 100, 100);
  };

  return (
    <div className="daily-points-block">
      <div className="points-header">
        <div className="points-icon">
          <FontAwesomeIcon icon={faStar} />
        </div>
        <h3>Daily Points</h3>
        <div className="gift-icon">
          <FontAwesomeIcon icon={faGift} />
        </div>
      </div>

      <div className="points-display">
        <div className="total-points">
          <span className="points-number">{formattedPoints}</span>
          <span className="points-label">points today</span>
        </div>
        <div className="season-info">
          <span className="season-label">{season} Season</span>
        </div>
      </div>

      <div className="points-breakdown">
        <div className="breakdown-item">
          <span className="breakdown-label">Season Base:</span>
          <span className="breakdown-value">{seasonBasePoints}</span>
        </div>
        <div className="breakdown-item bonus">
          <span className="breakdown-label">Accumulated:</span>
          <span className="breakdown-value">{accumulatedBonus}</span>
        </div>
      </div>

      <div className="points-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        <div className="progress-text">
          <span>{formattedPoints}/500 points to next reward</span>
        </div>
      </div>

      <div className="points-message">
        {displayPoints >= 500 ? (
          <span className="reward-message">🎉 Congratulations! You've earned a reward!</span>
        ) : (
          <span className="earn-more-message">
            Keep earning! {formatPoints(500 - displayPoints)} more points for a reward
          </span>
        )}
      </div>
    </div>
  );
};

export default DailyPointsBlock;