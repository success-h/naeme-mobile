import moment from 'moment';
import { Text } from 'react-native';
import { NumericFormat } from 'react-number-format';

export function ReactNativeNumberFormat({ value }: { value: number }) {
  return (
    <NumericFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      prefix={'$'}
      renderText={(formattedValue) => <Text>{formattedValue}</Text>} // <--- Don't forget this!
    />
  );
}

export function formatTime(time: Date | string) {
  return moment(time, 'HH:mm').format('h:mm A');
}
export function formatDate(date: Date | string) {
  return moment(date).format('MMMM D, YYYY');
}
