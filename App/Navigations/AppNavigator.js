import {
  createStackNavigator,
  createAppContainer,
} from "react-navigation";
import Home from "../Screens/Home";

const AppNavigator = createStackNavigator({
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
