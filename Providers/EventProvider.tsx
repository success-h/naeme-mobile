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
}

const EventContext = createContext({} as EventCartContextType);

export function useEventContext() {
  return useContext(EventContext);
}

export default function EventProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [eventData, setEventData] = useState<EventDataTypes>([]);
  const [refresh, setRefresh] = useState(true);
  const [searching, setSearching] = useState<boolean>(false);

  const loadMoreItem = () => {
    if (searching === false) {
      if (eventData.length > 1 && nextPage !== null) loadMore();
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      console.log('currentPage: ', nextPage);
      if (nextPage) {
        const response = await fetch(`${nextPage}`);
        const data = await response.json();
        if (eventData.length < data?.count) {
          setEventData([...eventData, ...data?.results]);
        }
        setLoading(false);
      }
    } catch (e) {
      console.log('LoadMore Error: ', e);
    }
  };

  const handleRefresh = () => {
    setEventData([]);
    fetchData();
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setSearching(false);
      const response = await fetch(
        `https://naeme-api.herokuapp.com/api/events`
      );
      const data = await response.json();
      console.log('data: ', data);
      setEventData(data?.results);
      setNextPage(data?.next);
      console.log('nextPage:', nextPage);
      setRefresh(false);
      setLoading(false);
    } catch (e) {}
  }, []);

  useEffect(() => {
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
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
