import React from 'react'
import { Home } from './user/pages/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './auth/pages/Login';
import { SignUp } from './auth/pages/SignUp';
import { UserHome } from './user/pages/UserHome';
import { Services } from './user/pages/Services';
import { SportsEvents } from './user/pages/sports-events/pages/SportsEvents';
import { EventAvailability } from './user/pages/sports-events/pages/EventAvailability';
import { EventDetail } from './user/pages/sports-events/pages/EventDetail';
import { AlertNotificationRoot } from "react-native-alert-notification";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { UserMealProfile } from './user/pages/user-profile/pages/UserMealProfile';
import { Historical } from './user/pages/user-profile/pages/Historical';
import { MealPlans } from './user/pages/meal-plans/pages/MealPlans';
import { Text } from 'react-native';
import { Progress } from './user/pages/user-profile/pages/Progress';
import { MealPlanDetail } from './user/pages/meal-plans/pages/MealPlanDetail';
import { useSelector } from "react-redux";
import { selectUserId } from './user/helpers/userSelectors';
import { SignalConnector } from './user/helpers/SignalConnector';
import { Messages } from './user/pages/user-profile/pages/Messages';
import { ExternalAppInformation } from './user/pages/user-profile/pages/ExternalAppInformation';
import { HeartRate } from './user/pages/user-profile/pages/HeartRate';
import { SportsPlans } from './user/pages/sports-plans/pages/SportsPlans';
import { SportsPlansDetail } from './user/pages/sports-plans/pages/SportsPlansDetail';
import { UserProfile } from './user/pages/user-profile/pages/UserProfile';
import { SportsPlansProfile } from './user/pages/user-profile/pages/SportsPlansProfile';
import { RegisterSportsSessions } from './user/pages/sports-plans/pages/RegisterSportsSessions';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export const Main = () => {
    const userId = useSelector(selectUserId);
    const notify = (values) => {
        toast.success(values.title, {
            closeButton: CloseButton,
        });
    };
    const { dataSignal } = SignalConnector(notify, userId);

    return (
        <AlertNotificationRoot
            theme="dark"
        >
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home"
                    screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </AlertNotificationRoot>
    )
};

const HomeScreen = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, }) => {
                let iconName;
                if (route.name === "Inicio") {
                    iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Historial") {
                    iconName = focused ? "time" : "time-outline";
                } else if (route.name === "Mensajes") {
                    iconName = focused ? "chatbubbles" : "chatbubbles-outline";
                } else if (route.name === "Perfil") {
                    iconName = focused ? "person" : "person-outline";
                }
                return <Ionicons name={iconName} size={28} color="#EA9354" />;
            },

            tabBarLabel: ({ focused, color }) => {
                const labelStyle = {
                    fontSize: focused ? 10 : 10,
                    color: focused ? '#EA9354' : '#666666',
                };
                return <Text style={labelStyle}>{route.name}</Text>;
            },

        })}
    >
        <Tab.Screen name="Inicio" component={SportAppStack} options={{ headerShown: false }} />
        <Tab.Screen name="Historial" component={Historical} options={{ headerShown: false }} />
        <Tab.Screen name="Mensajes" component={Messages} options={{ headerShown: false }} />
        <Tab.Screen name="Perfil" component={UserProfile} options={{ headerShown: false }} />
    </Tab.Navigator>


);
const SportAppStack = () => (
    <Stack.Navigator initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserHome" component={UserHome} />
        <Stack.Screen name="Services" component={Services} />
        <Stack.Screen name="EventAvailability" component={EventAvailability} />
        <Stack.Screen name="SportsEvents" component={SportsEvents} />
        <Stack.Screen name="EventDetail" component={EventDetail} />
        <Stack.Screen name="MealPlans" component={MealPlans} />
        <Stack.Screen name="MealPlanDetail" component={MealPlanDetail} />
        <Stack.Screen name="Progress" component={Progress} />
        <Stack.Screen name="ExternalAppInformation" component={ExternalAppInformation} />
        <Stack.Screen name="HeartRate" component={HeartRate} />
        <Stack.Screen name="SportsPlans" component={SportsPlans} />
        <Stack.Screen name="SportsPlansDetail" component={SportsPlansDetail} />
        <Stack.Screen name="UserMealProfile" component={UserMealProfile} />
        <Stack.Screen name="SportsPlansProfile" component={SportsPlansProfile} />
        <Stack.Screen name="RegisterSportsSessions" component={RegisterSportsSessions} />
    </Stack.Navigator>
);
