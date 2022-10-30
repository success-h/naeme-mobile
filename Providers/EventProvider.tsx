import React, {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface EventCartContextType {
  loading: boolean;
  setLoading(value: boolean): void;
  setNextPage: React.Dispatch<React.SetStateAction<string | null>>;
  nextPage: string | null;
  eventData: EventDataTypes;
  setEventData: React.Dispatch<React.SetStateAction<EventDataTypes>>;
  fetchData: () => Promise<void>;
  loadMoreItem: () => void;
  handleRefresh: () => void;
  refresh: boolean;
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setTextState: React.Dispatch<React.SetStateAction<string>>;
  textState: string;
}

const EventContext = createContext({} as EventCartContextType);

export function useEventContext() {
  return useContext(EventContext);
}

export default function EventProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [eventData, setEventData] = useState<EventDataTypes>([]);
  const [refresh, setRefresh] = useState(true);
  const [searching, setSearching] = useState<boolean>(false);
  const [textState, setTextState] = useState('');
  const [prevPage, setPreviousPage] = useState<string | null>(null);

  const loadMoreItem = () => {
    setLoading(true);
    if (searching === false) {
      if (nextPage !== null) {
        loadMore();
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      if (nextPage !== prevPage) {
        const response = await fetch(`${nextPage}`);
        const data = await response.json();
        console.log('Data:', data);
        if (eventData.length < data?.count) {
          setEventData([...eventData, ...data?.results]);
        }
        setPreviousPage(data.previous);
        setNextPage(data?.next);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log('LoadMore Error: ', e);
    }
  };

  const handleRefresh = () => {
    setTextState('');
    setLoading(true);
    setTextState('');
    fetchData();
  };

  const fetchData = useCallback(async () => {
    try {
      setSearching(false);
      const response = await fetch(
        `https://naeme-api.herokuapp.com/api/events`
      );
      const data = await response.json();
      console.log('data: ', data);
      setEventData(data?.results);
      setNextPage(data?.next);
      setPreviousPage(data.previous);
      setRefresh(false);
    } catch (e) {
      setLoading(false);
      console.log('error- fetchData:', e);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <EventContext.Provider
      value={{
        loading,
        setLoading,
        eventData,
        setEventData,
        fetchData,
        nextPage,
        setNextPage,
        loadMoreItem,
        refresh,
        handleRefresh,
        setSearching,
        setTextState,
        textState,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
