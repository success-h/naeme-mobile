import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Text, View } from 'react-native';
import { StringOrNull } from '../types/typings';
import { MyText } from '../components/AppText';

interface Props {
  date: StringOrNull;
  end_time: StringOrNull;
}

export const Countdown = ({ date, end_time }: Props) => {
  let datetime = moment(date + ' ' + end_time).format();
  const targetTime = moment(datetime);
  const [currentTime, setCurrentTime] = useState(moment());
  const timeBetween = moment.duration(targetTime.diff(currentTime));
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeBetween.asSeconds() < 0) {
    return (
      <View>
        <Text className="text-xl text-[#080808]">Event Completed🙂</Text>
      </View>
    );
  } else {
    return (
      <View className="flex-row items-center">
        <MyText textStyle="open-sans-bold" style="mr-1 text-2xl text-gray-700">
          {timeBetween.days()}d{' '}
        </MyText>
        <MyText textStyle="open-sans-bold" style="mr-1 text-2xl text-gray-700">
          {timeBetween.hours()}h{' '}
        </MyText>
        <MyText textStyle="open-sans-bold" style="mr-1 text-2xl text-gray-700">
          {timeBetween.minutes()}min{' '}
        </MyText>
        <MyText textStyle="open-sans-bold" style="mr-1 text-2xl text-gray-700">
          {timeBetween.seconds()}s{' '}
        </MyText>
      </View>
    );
  }
};
