import 'expo-dev-client';
import Navigation from '../navigation/navigator';
import EventProvider from './EventProvider';
import { AuthProvider } from './AuthProvider';
import CartProvider from './CartProvider';

export default function Provider() {
  return (
    <AuthProvider>
      <EventProvider>
        <CartProvider>
          {/*// @ts-ignore */}
          <Navigation />
        </CartProvider>
      </EventProvider>
    </AuthProvider>
  );
}
