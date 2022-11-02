import { useContext } from 'react';
import { EventContext } from '../Providers/EventProvider';

export function useEventContext() {
  return useContext(EventContext);
}
