import { useMemo, useRef } from 'react';
import { SortBySelectInput } from '../../SortBySelectInput';
import { DebouncedInput } from '../../DebouncedInput';
import { SortToggleButton } from '../../SortToggleButton';

export const ControlGroup = ({
  isDrawer,
  handleSearch,
  handleSortDirection,
  handleSortType,
}) => {
  const { current: sortOptions } = useRef(['artist', 'title', 'year']);
  const controlsGroup = useMemo(() => {
    const controls = [
      <div key="sortcontainer" className="flex">
        {handleSortDirection && typeof handleSortDirection === 'function' && (
          <SortToggleButton
            key="SortDirectionToggle"
            handleSortDirectionChange={handleSortDirection}
          />
        )}
        {handleSortType && typeof handleSortType === 'function' && (
          <SortBySelectInput
            key="SortByInput"
            className={isDrawer ? '' : 'mr-2'}
            sortOptions={sortOptions}
            onSortByChange={handleSortType}
          />
        )}
      </div>,
      handleSearch && typeof handleSearch === 'function' && (
        <DebouncedInput
          className={isDrawer ? 'mb-2' : 'mr-2'}
          key="SearchInput"
          placeholder="Search"
          handleChange={handleSearch}
        />
      ),
    ].reduce((prev, curr) => (curr ? [...prev, curr] : prev), []);

    return isDrawer ? controls.toReversed() : controls;
  }, [
    handleSearch,
    handleSortType,
    handleSortDirection,
    isDrawer,
    sortOptions,
  ]);

  return <>{controlsGroup}</>;
};
