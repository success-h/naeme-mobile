import React, { useEffect, useState } from "react";
import moment from "moment";
import { Text, View } from "react-native";

interface Props {
  end_date: string;
  end_time: string;
}

export const Countdown = ({ end_date, end_time }: Props) => {
  let datetime = moment(end_date + " " + end_time).format();
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
        <Text className="text-xl justify-center self-center">
          Event Completed🙂
        </Text>
      </View>
    );
  } else {
    return (
      <View className="flex-row items-center">
        <Text className="mx-1 text-lg text-gray-800 font-semibold">
          {timeBetween.days()}d{" "}
        </Text>
        <Text className="mr-1 text-lg text-gray-800 font-semibold">
          {timeBetween.hours()}h{" "}
        </Text>
        <Text className="mr-1 text-lg text-gray-800 font-semibold">
          {timeBetween.minutes()}min{" "}
        </Text>
        <Text className="mr-1 text-lg text-gray-800 font-semibold">
          {timeBetween.seconds()}s{" "}
        </Text>
      </View>
    );
  }
};
