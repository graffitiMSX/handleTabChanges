import React from 'react';
import { Text, View, Alert } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

const homeIcon = ({tintColor}) => <Icon name="home" color={tintColor} size={30} />;
const settingsIcon = ({tintColor}) => <Icon name="cog" color={tintColor} size={30} />;
const exitIcon = ({tintColor}) => <Icon name="sign-out-alt" color={tintColor} size={30} />;

class HomeScreen extends React.Component {
  
  static navigationOptions = () => {
    return {
      title: 'Início',
      tabBarIcon: homeIcon,
      tabBarOnPress({ navigation, defaultHandler }) {
        defaultHandler();       
      }
    }
  }

  render() {
    return (      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>      
        <Text style={{ fontSize: 36 }}>Home</Text>
      </View>
    );
  }
}

class ExitScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'Saída',
      tabBarIcon: exitIcon,
      tabBarOnPress({ navigation, defaultHandler }) {
        Alert.alert(  
            'Confirme saída',  
            'Tem certeza que deseja sair?',  
            [  
                {  
                    text: 'Cancelar',  
                    onPress: () => {
                      console.log('Cancelado')
                      return;
                      },  
                    style: 'cancel',  
                },  
                {
                    text: 'OK',
                    onPress: () => {
                      console.log('Confirmado')
                      defaultHandler();
                    }
                },  
            ]  
        );        
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 36 }}>Saída</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  state = {
    foo: 1,
  };

  static navigationOptions = () => {
    return {
      title: 'Config',
      tabBarIcon: settingsIcon,
      // this handler will override the generic one defined at Navigator level
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        if (navigation.isFocused()) {
          Alert.alert('Mais um!','clique sequencial na aba Settings');          
          return;
        }

        navigation.state.params.onTabFocus();
        defaultHandler();
      },
    };
  };

  constructor(props) {
    super(props);
    props.navigation.setParams({
      onTabFocus: this.handleTabFocus,
    });
  }

  handleTabFocus = () => {
    Alert.alert('Entrou!',`Renderizando Settings pela primeira vez!`);
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 36 }}>Settings</Text>
      </View>
    );
  }
}

export default createBottomTabNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsScreen,
    Exit: ExitScreen
  },
  {
    tabBarOptions: {
      activeTintColor: 'yellow',
      inactiveTintColor: '#D3D3D3',
      labelPosition: 'below-icon',
      labelStyle: {
        fontSize: 20,
      },
      style: {
        height: 70,
        backgroundColor: '#00BFFF',
      },
    },
    navigationOptions: {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        defaultHandler();
      },
    },
    lazy: false,
  }
);
