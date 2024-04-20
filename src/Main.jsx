import React, { useEffect } from 'react'
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
import { UserReservations } from './user/pages/UserReservations';
import { AlertNotificationRoot } from "react-native-alert-notification";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { UserMealProfile } from './user/pages/user-profile/pages/UserMealProfile';
import { Messages } from './user/pages/user-profile/pages/Messages';
import { Historical } from './user/pages/user-profile/pages/Historical';
import { MealPlans } from './user/pages/meal-plans/pages/MealPlans';
import { Text } from 'react-native';
import { Progress } from './user/pages/user-profile/pages/Progress';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export const Main = () => (
    <AlertNotificationRoot>
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

);

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
                    fontSize: focused ? 10 : 10, // Tamaño de letra aumentado si la pestaña está enfocada
                    color: focused ? '#EA9354' : '#666666', // Color predeterminado
                };
                return <Text style={labelStyle}>{route.name}</Text>;
            },

        })}
    >
        <Tab.Screen name="Inicio" component={SportAppStack} options={{ headerShown: false }} />
        <Tab.Screen name="Historial" component={Historical} options={{ headerShown: false }} />
        <Tab.Screen name="Mensajes" component={Messages} options={{ headerShown: false }} />
        <Tab.Screen name="Perfil" component={UserMealProfile} options={{ headerShown: false }} />


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
        <Stack.Screen name="UserReservations" component={UserReservations} />
        <Stack.Screen name="MealPlans" component={MealPlans} />
        <Stack.Screen name="Progress" component={Progress} />

    </Stack.Navigator>


);
