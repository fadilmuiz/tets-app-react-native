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
import { getAll } from '../slice/slice'
import { getDetail } from "../slice/slice";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const [displayDetail, setDisplayDetail] = useState("none");

  const cardGap = 16;
  const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;
  const { data } = useSelector((state) => state.user);
  const { detail } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const storeData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        dispatch(getAll(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getAll());
  }, []);
  // const jsonString = JSON.stringify(data);
  const seeForm = () => {
    setDisplayDetail("flex");
  };
  const hideForm = () => {
    setDisplayDetail("none");
  };

  const seeDetail = (id) => {
    seeForm()
    dispatch(getDetail(id))
  };

  return (
    <>
      {/* detail pop up */}
      <View
        style={{
          display: displayDetail,
          position: "absolute",
          zIndex: 1,
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          backgroundColor: "#fff",
          height: "100%",
          // opacity: 0.9,
        }}
      >
        <View style={{ marginTop: 70 }}>
          <Text
            style={{
              textAlign: "center",
              color: "black",
              fontWeight: "bold",
              fontSize: 35,
            }}
          >
            Detail
          </Text>
          <View style={{
            marginBottom: 40,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            <View
              style={{
                marginTop: cardGap,
                paddingTop: 15,
                height: 500,
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
                // width: cardWidth,
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 20, paddingTop: 15, }}
                >Name : <Text style={styles.text}>{detail?.data?.name}</Text>
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20, paddingTop: 15, }}
                >Year : <Text style={styles.text}>{detail?.data?.year}</Text>
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20, paddingTop: 15, }}
                >Color : <Text style={styles.text}>{detail?.data?.color}</Text>
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20, paddingTop: 15, }}
                >Value : <Text style={styles.text}>{detail?.data?.pantone_value}</Text></Text>

              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => hideForm()}>
            <LinearGradient
              colors={["#0C6EB1", "#22C49D"]}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.button}
            >
              <Text
                style={{
                  marginLeft: 10,
                  color: "#fff",
                  fontSize: 26,
                  fontWeight: "bold",
                }}
              >Back</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View >
      {/* end detail */}

      < View style={styles.container} >
        {/* <ImageBackground source={image} resizeMode="cover" style={{ height: 400 }}> */}
        {/* <Text>{jsonString.data}</Text> */}
        {/* </ImageBackground> */}
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            fontSize: 35,
          }}
        >
          Dashboard
        </Text>
        <View style={styles.containerr}>
          {data?.data?.map((subject, i) => {
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
                  <Text style={{ fontWeight: 'bold' }}>{subject.name}</Text>
                  <Text style={{ padding: 3 }}>Year : {subject.year}</Text>
                  <Text style={{ padding: 3 }}>Color : {subject.color}</Text>
                  <Text style={{ padding: 3 }}>Value :{subject.pantone_value}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View >
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
    height: 140,
    width: 100,
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
    backgroundColor: "#0C6EB1"
  },
})