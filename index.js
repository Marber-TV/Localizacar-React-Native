import { AppRegistry } from 'react-native';
import App from './App'; // The path to your App component
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
