import { createStackNavigator, createAppContainer } from 'react-navigation';
import StudentIdScanner from './StudentIdScanner';
import MenuScreen from './MenuScreen';
import ScanItem from './ScanItem';


const AppNavigator = createStackNavigator({
  StudentIdScanner: { screen: StudentIdScanner },
  MenuScreen: { screen: MenuScreen },
  ScanItem: {screen: ScanItem},
});

export default createAppContainer(AppNavigator);
