import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen";
import FormAddUser from "../screen/FormAddUser";
const Stack = createNativeStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      >
      <Stack.Screen
        name="dashboardPage"
        component={HomeScreen}
        options={{
          // title: "Dashboard",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
