import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { useParams } from 'react-router-dom';

export const useChosenConveyor = () => {
  const { slug } = useParams();
  const allConveyors = useSelector((state: RootState) => state.conveyors.allConveyors);

  const chosenConveyorId = useSelector((state: RootState) => state.conveyors.chosenConveyorID) 
    || allConveyors.find(conveyor => conveyor.slug === slug)?.id;

  const chosenConveyor = allConveyors.find(conveyor => conveyor.id === chosenConveyorId);
  if (!chosenConveyor) {
    return;
  }

  return chosenConveyor;
}
