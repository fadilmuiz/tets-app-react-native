import axios from "axios";
import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doRegister } from "../slice/slice";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";


export default function RegisterScreen() {
  const image = {
    uri:
      'https://images.unsplash.com/photo-1501643454230-e590702f0951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  // const loading = useSelector(selectLoading);

  const onClickLogin = () => {
    navigate("LoginPage");
  };

  const onClickRegister = async () => {
    try {
      const move = () => {
        navigate("LoginPage");
      };
      const AlertSuccess = () => {
        Alert.alert("Success", "Register successful!");
      };
      const AlertFailed = () => {
        Alert.alert("Register failed!", "Check your input");
      };
      dispatch(
        doRegister({ email, password, move, AlertSuccess, AlertFailed })
      );
    } catch (error) {
      console.log(error);
    }

  };
  return (
    <View style={styles.container}>
        <ScrollView
          style={{
            height: "100%",
            backgroundColor: "#fff",
            width: "80%"
          }}
        >
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              backgroundColor: "#fff",
            }}
          >
            {/* Title */}
            <View>
              <View>
                <View
                  style={{
                    paddingLeft: 50,
                    paddingRight: 50,
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    height: 220,
                    justifyContent: "center",
                  }}
                >
                </View>
              </View>
              <Text
                style={{
                  color: "#0C6EB1",
                  fontWeight: "bold",
                  fontSize: 32,
                  textAlign: "center",
                }}
              >
                Register
              </Text>
            </View>
            {/* Form */}
            <KeyboardAvoidingView behavior="padding" enabled>
              <View>
                <TextInput
                  placeholder="type your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  style={styles.input}
                />
                <TextInput
                  placeholder="type your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={onClickRegister}
                  underlayColor="transparent"
                  activeOpacity={1}
                >
                  <View style={{ padding: 20.0 }}>
                    <LinearGradient
                      colors={["#0C6EB1", "#22C49D"]}
                      start={[0, 0]}
                      end={[1, 0]}
                      style={styles.button}
                      onPress={onClickRegister}
                    >
                      <Text style={styles.text}>Register</Text>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClickLogin}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      color: "#0C6EB1",
                    }}
                  >
                    Sign in here
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            <View style={{ bottom: 0, position: "relative", paddingLeft: 10 }}>
            </View>
          </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 18,
    backgroundColor: "#EEEEEE",
    borderColor: "#EEEEEE",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: "hidden",
    borderRadius: 18,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 18,
    elevation: 3,
    backgroundColor: "#0C6EB1",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});