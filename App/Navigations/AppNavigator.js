import {
  createStackNavigator,
  createAppContainer,
} from "react-navigation";
import Home from "../Screens/Home";
import SplashScreen from '../Screens/SplashScreen';

const AppNavigator = createStackNavigator({
      SplashScreen: {
        screen: SplashScreen
      },
    Home: {
      screen: Home
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const appContainer = createAppContainer(AppNavigator);
export default appContainer;
