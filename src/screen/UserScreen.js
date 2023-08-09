import axios from "axios";
import React, { useState, AsyncStorage, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from '../slice/slice'
import { LinearGradient } from "expo-linear-gradient";
import { addUser } from "../slice/slice";
import { useNavigation } from "@react-navigation/native";
import { getUserDetail } from "../slice/slice";

export default function UserScreen() {
  const { navigate } = useNavigation();

  const cardGap = 16;
  const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;
  const { dataUser } = useSelector((state) => state.user);
  // const { detail } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  // const jsonString = JSON.stringify(data);
  const onClickLogin = async () => {
    try {
      const move = () => {
        navigate("Dashboard");
      };
      const AlertSuccess = () => {
        Alert.alert("Success", "Add user successful!");
      };
      const AlertFailed = () => {
        Alert.alert("Login failed!", "Check your input");
      };
      dispatch(
        addUser({name, job, move, AlertSuccess, AlertFailed}),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const seeDetail = (id) => {
    const move = () => {
      navigate("FormEditUserStack");
    };
    dispatch(getUserDetail({id, move}));
  };

  return (
    <>
      <TouchableOpacity onPress={() => navigate('FormAddStackUser')}>
        <View style={{ padding: 10 }}>
          <LinearGradient
            colors={["#0C6EB1", "#22C49D"]}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.button}
            
          >
            <Text style={styles.text}>Add User</Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        {/* <ImageBackground source={image} resizeMode="cover" style={{ height: 400 }}> */}
        {/* <Text>{jsonString.data}</Text> */}
        {/* </ImageBackground> */}
        <View style={styles.containerr}>
          {dataUser?.data?.map((subject, i) => {
            return (
              <View
                key={subject.id}
                style={[
                  styles.cardContainer,
                  {
                    marginTop: cardGap,
                    marginLeft: i % 2 !== 0 ? cardGap : 0,
                    width: cardWidth,
                  },
                ]}
              >
                <TouchableOpacity 
                  style={styles.card}
                  onPress={() => seeDetail(subject.id)}
                >
                  <Image
                    // key={i}
                    source={{
                      uri: subject.avatar
                    }}
                    style={{ width: 60, height: 60, borderRadius: 30 }}
                  />
                  <Text style={{ padding: 10, fontWeight: 'bold' }}>{subject.first_name}  {subject.last_name}</Text>
                  <Text style={{ padding: 10 }}>{subject.email}</Text>
                  <Text>{subject.pantone_value}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </>
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
  containerr: {
    // flexGrow: 1,
    paddingHorizontal: 16,
    marginBottom: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cardContainer: {
    paddingTop: 15,
    height: 200,
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    // justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: "hidden",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
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
})