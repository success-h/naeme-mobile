import 'expo-dev-client';
import Navigation from '../navigation/navigator';
import EventProvider from './EventProvider';
import { AuthProvider } from './AuthProvider';

export default function Provider() {
  return (
    <AuthProvider>
      <EventProvider>
        {/*// @ts-ignore */}
        <Navigation />
      </EventProvider>
    </AuthProvider>
  );
}
