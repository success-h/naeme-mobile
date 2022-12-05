import React, {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
interface EventCartContextType {
  loading: boolean;
  setLoading(value: boolean): void;
  setNextPage: React.Dispatch<React.SetStateAction<string | null>>;
  nextPage: string | null;
  eventData: EventDataTypes[] | undefined;
  setEventData: React.Dispatch<
    React.SetStateAction<EventDataTypes[] | undefined>
  >;
  fetchData(url: any): Promise<EventDataTypes[] | undefined>;
  loadMoreItem: () => void;
  handleRefresh: () => void;
  refresh: boolean;
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setTextState: React.Dispatch<React.SetStateAction<string>>;
  textState: string;
  location: LocationType;
  like: boolean;
  setLike: React.Dispatch<React.SetStateAction<boolean>>;
  featuredEvent: EventDataTypes[];
  setFeaturedEvent: React.Dispatch<React.SetStateAction<EventDataTypes[]>>;
  searching: boolean;
}

type LocationType = {
  country: string | null;
  city: string | null;
};

export const EventContext = createContext({} as EventCartContextType);

import { serverUrl } from '@env';
import { EventDataTypes, ResponseType } from '../types/typings';
import { useAuthContext } from '../hooks/useAuth';

export default function EventProvider({ children }: { children: ReactNode }) {
  const [featuredEvent, setFeaturedEvent] = useState<EventDataTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [eventData, setEventData] = useState<EventDataTypes[] | undefined>([]);
  const [refresh, setRefresh] = useState(true);
  const [searching, setSearching] = useState<boolean>(false);
  const [textState, setTextState] = useState('');
  const [prevPage, setPreviousPage] = useState<string | null>(null);
  const [like, setLike] = useState(true);
  const { user } = useAuthContext();

  const [location, setLocation] = useState<LocationType>({
    city: null,
    country: null,
  });

  const loadMoreItem = () => {
    console.log("'''''''''''''loading''''''''''");
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
        const data: ResponseType = await response.json();
        if (eventData?.length! < data?.count!) {
          setEventData([...eventData!, ...data?.results]);
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

  const Url = `${serverUrl}/events`;

  const fetchData = async (url: any) => {
    try {
      setSearching(false);
      const response = await fetch(url);
      const data: ResponseType = await response.json();
      if (data.next !== null) {
        setNextPage(data?.next);
      }
      setPreviousPage(data.previous);
      setRefresh(false);
      setLoading(false);
      return data?.results;
    } catch (e) {
      console.log(e);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    const data: EventDataTypes[] | undefined = await fetchData(Url);
    setEventData(data);
    setLoading(false);
    return data;
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      const data: EventDataTypes[] | undefined = await fetchData(Url);
      setEventData(data);
      setLoading(false);
    })();
  }, []);

  return (
    <EventContext.Provider
      value={{
        location,
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
        searching,
        setTextState,
        textState,
        like,
        setLike,
        setFeaturedEvent,
        featuredEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
