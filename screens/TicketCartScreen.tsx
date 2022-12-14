import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { RootStackScreenProps } from '../types/types';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { MyText } from '../components/AppText';
import { formatCurrency, formatDate } from '../Utils/formatter';
import axios from 'axios';
import { serverUrl } from '@env';
import {
  ResponseType,
  TicketDataTypes,
  TicketResponseType,
} from '../types/typings';
import { useCartContext } from '../Providers/CartProvider';
// @ts-ignore
import CartImage from '../assets/images/CART.png';
import Checkout from '../components/Pay';
import { StatusBar } from 'expo-status-bar';

const Cart = Image.resolveAssetSource(CartImage).uri;

export default function TicketCartScreen({
  navigation,
  route,
}: RootStackScreenProps<'TicketCart'>) {
  const data = route.params;
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<TicketDataTypes[]>([]);

  const {
    getItemQuantity,
    cartTotal,
    cartItems,
    cartQuantity,
    decreaseCartQuantity,
    increaseCartQuantity,
    setCartItems,
    toggleOrderSummary,
    orderSummaryToggle,
  } = useCartContext();

  const getTickets = async () => {
    try {
      const response = await fetch(
        `${serverUrl}/tickets/?event=${route.params.id}`
      );
      const ticketData: TicketResponseType = await response.json();
      if (response.status === 200) {
        if (ticketData.results) {
          setTickets(ticketData.results);
        }
      }
      setLoading(false);
      return true;
    } catch (e) {
      setLoading(false);
      return e;
    }
  };

  useLayoutEffect(() => {
    getTickets();
  }, []);

  return (
    <View className="flex-1">
      <StatusBar
        style={Platform.OS === 'ios' ? 'light' : 'light'}
        backgroundColor="#000"
      />
      <ScrollView
        className={`h-full ${
          Platform.OS === 'android' ? 'pt-[17%]' : 'pt-[16%]'
        }`}
      >
        <View className="z-20">
          {Platform.OS === 'android' && (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                setCartItems([]);
              }}
              className={`z-10 absolute rounded-full left-5 items-center p-2`}
            >
              <AntDesign name="arrowleft" size={20} color="#181818" />
            </TouchableOpacity>
          )}
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                setCartItems([]);
              }}
              className={`bg-[#d7d7d7] z-10 absolute rounded-full right-5 items-center p-1`}
            >
              <AntDesign name="close" size={17} color="#181818" />
            </TouchableOpacity>
          )}
        </View>

        <View className="mb-4">
          <MyText textStyle="open-sans-bold" style="text-center mt-2 text-xl">
            {data.title}
          </MyText>
          <View className="mx-auto flex-row mt-3 items-center ">
            <AntDesign name="calendar" size={17} color="#181818" />
            <MyText
              textStyle="open-sans-bold"
              style="text-center text-sm text-gray-700 ml-2"
            >
              {formatDate(data.date)}
            </MyText>
          </View>
        </View>
        <View className="border-b border-gray-200" />

        {loading ? (
          <ActivityIndicator size={'large'} className="mt-16" />
        ) : (
          <View className="mt-10 px-5">
            {tickets.map(({ event, id, price, title }) => {
              const quantity = getItemQuantity(id);
              return (
                <View key={id}>
                  <View className="flex-row items-center justify-between h-20">
                    <View className="flex-1 flex-start">
                      <View className="flex-row ">
                        <MyText
                          textStyle="open-sans-semi"
                          style="text-rose-500 text-md px-2 py-1 rounded-lg border-[1px] border-rose-300"
                        >
                          $ {formatCurrency(price)}
                        </MyText>
                      </View>
                    </View>
                    <View className="flex-1">
                      <MyText textStyle="open-sans-bold" style="text-lg">
                        {title}
                      </MyText>
                      <MyText
                        textStyle="open-sans-medium"
                        style="text-xs text-gray-400"
                      >
                        {data.total_sold_tickets === null
                          ? 0
                          : data.total_sold_tickets}
                        /{data.total_ticket_count} SOLD
                      </MyText>
                    </View>

                    <View className="flex-1 items-end">
                      <View className="flex-row  h-[45px] items-center border-[1px] px-2 py-1 rounded-lg border-gray-300">
                        <AntDesign
                          name="minuscircleo"
                          size={24}
                          color="#C4C4C4"
                          className="my-2"
                          onPress={() => decreaseCartQuantity(id)}
                        />
                        <MyText
                          textStyle="open-sans-semi"
                          style="text-md mx-4 text-[#474042]"
                        >
                          {quantity}
                        </MyText>
                        <AntDesign
                          className="my-2"
                          name="pluscircleo"
                          onPress={() =>
                            increaseCartQuantity(id, price, title, event, data)
                          }
                          size={24}
                          color="#C4C4C4"
                        />
                      </View>
                    </View>
                  </View>
                  <View className="border-b border-gray-200" />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
      <View className="absolute z-40 bottom-0 px-5 right-0 rounded-t-3xl flex-row left-0 bg-[#0f0f0f] h-[11%]">
        <View className="flex-1 flex-row justify-between items-center">
          <TouchableOpacity onPress={toggleOrderSummary}>
            <View className="relative w-20">
              <Image className="h-7 w-7" source={{ uri: Cart }} />
              <View className="absolute -mt-4 ml-7 bg-rose-500 px-2 py-1 rounded-full">
                <Text className="text-white ">{cartQuantity}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <MyText textStyle="open-sans-bold" style="text-white text-lg">
            $ {formatCurrency(cartTotal)}
          </MyText>
          <View className="">
            {cartQuantity > 0 && (
              <TouchableOpacity className="bg-rose-500 rounded-lg px-6 py-2">
                <Checkout />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {orderSummaryToggle ? (
        <View className="absolute bottom-0 pt-20 right-0  left-0 bg-[#19191b] h-[100%]">
          <View className="flex-row px-3">
            <View className="flex-1"></View>
            <MyText
              textStyle="open-sans-bold"
              style="text-white text-xl text-rose-400 text-center"
            >
              Order Summary
            </MyText>
            <TouchableOpacity
              onPress={() => toggleOrderSummary()}
              className={`flex-row flex-1 rounded-full  items-center justify-end p-1`}
            >
              <AntDesign name="close" size={17} color="#fff" />
            </TouchableOpacity>
          </View>

          <View className="px-5 mt-5">
            {cartItems.map((item) => {
              const quantity = getItemQuantity(item.id);
              return (
                <View
                  key={item.id}
                  className="flex-row items-center my-2 justify-between"
                >
                  <MyText textStyle="open-sans-semi" style="text-white text-sm">
                    {quantity} x {item.title}
                  </MyText>
                  <MyText textStyle="open-sans-semi" style="text-white text-sm">
                    {item.eventTitle}
                  </MyText>
                  <MyText textStyle="open-sans-semi" style="text-white text-sm">
                    $ {formatCurrency(item.price)}
                  </MyText>
                </View>
              );
            })}

            <View className="mt-7 flex-row items-baseline">
              <MyText textStyle="open-sans-semi" style="text-white text-lg">
                Total:
              </MyText>
              <MyText
                textStyle="open-sans-semi"
                style="ml-3 text-white text-lg"
              >
                $ {formatCurrency(cartTotal)}
              </MyText>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}
