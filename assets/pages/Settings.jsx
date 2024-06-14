import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useTheme } from '../components/ThemeContext'; // Asegúrate de importar desde la ubicación correcta
import stylesSettings from '../styles/stylesSettings';
import { Icon, Box } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; // Asegúrate de tener este import

const Settings = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // Usar useTheme para acceder al tema y la función de cambio
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={{ ...stylesSettings.container, backgroundColor: theme === 'light' ? '#fff' : '#333' }}> 
      <View style={stylesSettings.setting}>
        <Text style={{ ...stylesSettings.settingText, color: theme === 'light' ? '#000' : '#fff' }}>Notificaciones</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {/* Botón para cambiar el tema */}
      <View style={stylesSettings.setting}>
        <Text style={{ ...stylesSettings.settingText, color: theme === 'light' ? '#000' : '#fff' }}>Modo oscuro</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={theme === 'dark' ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme} // Llama a toggleTheme para cambiar el tema
          value={theme === 'dark'}
        />
      </View>
      {/* Disclaimer */}
      <Box borderColor="black" borderWidth={1} borderRadius={5} padding={3} marginTop={5} flexDirection="row">
        <Icon as={MaterialIcons} name="warning-amber" color="yellow" size="md" style={{ marginRight: 10 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme === 'light' ? '#000' : '#fff', fontSize: 12 }}>
            Estos son unos ajustes experimentales que actualmente están en construcción. Te recomendamos proceder con precaución al utilizar estas funciones, ya que pueden no estar completamente optimizadas o libres de errores. Tu experiencia y seguridad son importantes para nosotros, por lo que te agradecemos cualquier feedback que puedas proporcionar. Por favor, úsalo bajo tu propia responsabilidad y ten en cuenta que estamos trabajando continuamente para mejorar estas características. ¡Gracias por tu comprensión y apoyo!
          </Text>
        </View>
      </Box>
    </View>
  );
};

export default Settings;
