import {
  useControlContext,
  ControlStateProps,
} from '../../Hooks/useControlGroup';
import { SortAscendingIcon, SortDescendingIcon } from '../../Icons';
import { useClassConcat } from '../../Hooks/useClassConcat';
import { SortDirections } from '../../Constants/SortDirections';

export const SortToggleButton = ({ className, handleSortDirectionChange }) => {
  const {
    state: { sortDirection },
    dispatch: setSortDirection,
  } = useControlContext();
  const classes = useClassConcat('', className);

  const toggleSortDirection = () => {
    const { ascending, descending } = SortDirections;
    const nextDirection = sortDirection === ascending ? descending : ascending;
    setSortDirection({
      type: ControlStateProps.sortDirection,
      payload: nextDirection,
    });
    handleSortDirectionChange?.(nextDirection);
  };

  return (
    <div className={classes}>
      <button className="p-3" onClick={toggleSortDirection}>
        {sortDirection === SortDirections.ascending && (
          <SortAscendingIcon className="fill-cyan-500 size-6" />
        )}
        {sortDirection === SortDirections.descending && (
          <SortDescendingIcon className="fill-cyan-500 size-6" />
        )}
      </button>
    </div>
  );
};
