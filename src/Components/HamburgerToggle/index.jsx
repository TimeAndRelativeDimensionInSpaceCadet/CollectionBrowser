import { useClassConcat } from '../../Hooks/useClassConcat';
import './index.scss';

export const HamburgerToggle = ({ isToggled, handleToggle = () => {} }) => {
  const btnClasses = useClassConcat(
    'toggle-btn p-3',
    isToggled ? 'active' : ''
  );
  const burgerClasses = useClassConcat(
    'hamburger children:bg-cyan-500',
    isToggled ? 'close' : ''
  );

  return (
    <div className={btnClasses} onClick={handleToggle}>
      <div className={burgerClasses}>
        <div className="patty"></div>
        <div className="patty"></div>
        <div className="patty"></div>
      </div>
    </div>
  );
};
