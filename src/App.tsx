import Root from './components/Root/Root';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import './App.scss';
import { ConveyorsList } from './components/ConveyorsList/ConveyorsList';
import { Conveyor } from './components/Conveyor/Conveyor';
import { ThankYou } from './components/ThankYou/ThankYou';
import { NotFound } from './components/NotFound/NotFound';

const router = 
  createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <Root/> } errorElement={<NotFound />}>
      <Route path="conveyors" element={ <ConveyorsList /> } />
      <Route path="conveyors/:slug" element={ <Conveyor /> } />
      <Route path="thank-you" element={ <ThankYou />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={ router } />
  );
}

export default App;
