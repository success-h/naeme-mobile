import moment from 'moment';
import { Text } from 'react-native';
import { NumericFormat } from 'react-number-format';

export function ReactNativeNumberFormat({ value }: { value: number }) {
  console.log(value);
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

export function formatTime(time: string) {
  return moment(time, 'HH:mm').format('h:mm A');
}
