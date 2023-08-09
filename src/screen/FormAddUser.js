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
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { addUser } from "../slice/slice";


export default function FormAddUser() {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  // const loading = useSelector(selectLoading);

  const onClickLogin = () => {
    navigate("User");
  };

  const handleAdd = async () => {
    try {
      const move = () => {
        navigate("Dashboard");
      };
      const AlertSuccess = () => {
        Alert.alert("Success", "Add user successful!");
      };
      const AlertFailed = () => {
        Alert.alert("Add user failed!", "Check your input");
      };
      dispatch(
        addUser({ userName, email, move, AlertSuccess, AlertFailed }),
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
              Add User
            </Text>
          </View>
          {/* Form */}
          <KeyboardAvoidingView behavior="padding" enabled>
            <View>
              <TextInput
                placeholder="Name"
                value={userName}
                onChangeText={setUserName}
                style={styles.input}
              />
              <TextInput
                placeholder="Email"
                value={email}
                keyboardType="email-address"
                onChangeText={setEmail}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={handleAdd}
                underlayColor="transparent"
                activeOpacity={1}
              >
                <View style={{ padding: 20.0 }}>
                  <LinearGradient
                    colors={["#0C6EB1", "#22C49D"]}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={styles.button}
                    onPress={handleAdd}
                  >
                    <Text style={styles.text}>Add</Text>
                  </LinearGradient>
                </View>
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