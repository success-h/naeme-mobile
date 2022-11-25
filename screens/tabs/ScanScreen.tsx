import { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  RootStackParamList,
  RootStackScreenProp,
  RootTabScreenProps,
  TabScreenProps,
} from '../../types/types';
import { Camera, CameraType } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { PaidTicketDataTypes } from '../../types/typings';
import { serverUrl } from '@env';
import axios from 'axios';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MyText } from '../../components/AppText';

type NavProp = NavigationProp<RootStackParamList, 'MyTicketDetail'>;

export default function ScannerScreen({ route }: TabScreenProps<'Scan'>) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [useScan, setUseScan] = useState(false);
  const [scanned, setScanned] = useState(false);

  const navigation = useNavigation<NavProp>();

  if (route.name !== 'Scan') {
    setScanned(false);
  }

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: any;
    data: string;
  }) => {
    setScanned(true);
    const response = await axios.get(`${serverUrl}/my-tickets/${data}`);
    const responseData: PaidTicketDataTypes = await response.data;
    console.log(responseData);
    if (data) {
      navigation.navigate('MyTicketDetail', { ...responseData });
      setScanned(false);
      setUseScan(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#090808]">
      <View className="mt-20">
        <MyText
          textStyle="open-sans-bold"
          style="text-xl text-rose-400 text-center"
        >
          Ticket QRCODE Scanner
        </MyText>
        <MyText style="text-sm text-gray-200 text-center">
          Scan and verify your tickets
        </MyText>
      </View>
      <View className=" h-[50%] my-auto items-center justify-center">
        {useScan && (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            className="h-[100%] w-full"
            style={StyleSheet.absoluteFillObject}
          />
        )}
        {!useScan && (
          <TouchableOpacity
            onPress={() => setUseScan(true)}
            className="bg-rose-400 rounded-xl"
          >
            <MyText style="text-lg px-5 py-2 text-gray-200 text-center">
              Scan a ticket
            </MyText>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
