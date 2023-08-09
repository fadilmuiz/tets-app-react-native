import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import FormAddUser from "../screen/FormAddUser";

export default function MainStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Login"
    >
      <Stack.Screen
        name="LoginPage"
        component={LoginScreen}
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterPage"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
