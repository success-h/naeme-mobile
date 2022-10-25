import { Text } from "react-native";
import { NumericFormat } from "react-number-format";

export function ReactNativeNumberFormat({ value }: { value: number }) {
  console.log(value);
  return (
    <NumericFormat
      value={value}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"$"}
      renderText={(formattedValue) => <Text>{formattedValue}</Text>} // <--- Don't forget this!
    />
  );
}
