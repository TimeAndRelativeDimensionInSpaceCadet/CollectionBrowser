import { useClassConcat } from '../../Hooks/useClassConcat';
import './index.scss';

export const HamburgerToggle = ({ isToggled, handleToggle = () => {} }) => {
  const btnClasses = useClassConcat('toggle-btn', isToggled ? 'active' : '');
  const burgerClasses = useClassConcat('hamburger', isToggled ? 'close' : '');
  return (
    <div class={btnClasses} onClick={handleToggle}>
      <div class={burgerClasses}>
        <div class="patty"></div>
        <div class="patty"></div>
        <div class="patty"></div>
      </div>
    </div>
  );
};
