import { useClassConcat } from '../../Hooks/useClassConcat';
import { RecordIcon } from '../../Icons';

export const LoadingSpinner = ({ className }) => {
  const classes = useClassConcat('animate-spin', className);
  return <RecordIcon className={classes} />;
};
