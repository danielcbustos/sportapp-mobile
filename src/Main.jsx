import React, { useEffect } from 'react'
import { Home } from './user/pages/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './auth/pages/Login';
import { SignUp } from './auth/pages/SignUp';
import { UserHome } from './user/pages/UserHome';
import { Services } from './user/pages/Services';
import { SportsEvents } from './user/pages/SportsEvents';
import { EventAvailability } from './user/pages/EventAvailability';
import { AlertNotificationRoot } from "react-native-alert-notification";
import { useDispatch, useSelector } from "react-redux";
import { EventDetail } from './user/pages/EventDetail';
import { UserReservations } from './user/pages/UserReservations';
const Stack = createNativeStackNavigator();


export const Main = () => {
    return (
        // <AlertNotificationRoot>
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name="UserHome" component={UserHome} options={{ headerShown: false }} />
                <Stack.Screen name="Services" component={Services} options={{ headerShown: false }} />
                <Stack.Screen name="EventAvailability" component={EventAvailability} options={{ headerShown: false }} />
                <Stack.Screen name="SportsEvents" component={SportsEvents} options={{ headerShown: false }} />
                <Stack.Screen name="EventDetail" component={EventDetail} options={{ headerShown: false }} />
                <Stack.Screen name="UserReservations" component={UserReservations} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
        // </AlertNotificationRoot>





    )
}

