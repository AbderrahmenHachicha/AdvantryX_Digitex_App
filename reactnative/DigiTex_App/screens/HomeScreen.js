import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,Platform,SafeAreaView,StatusBar,ScrollView,useWindowDimensions,ActivityIndicator,} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Image } from "react-native";

export default function Dashboard() {
  const [workerData, setWorkerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(""); 
  const { width } = useWindowDimensions();

  
  useEffect(() => {
    fetch("http://192.168.1.10:8000/worker/12345")
      .then((response) => response.json())
      .then((data) => {
        setWorkerData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching worker data:", error);
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateClock(); 
    const interval = setInterval(updateClock, 1000); 
    return () => clearInterval(interval); 
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  if (!workerData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>Worker data not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
            <Image
            source={require('../assets/advantryX.png')}
            style={styles.logo}
            />


          <View style={styles.infoRow}>
            <Text style={[styles.infoText, { fontSize: RFValue(16, width) }]}>
              <Text style={styles.label}>MTC: </Text>
              <Text style={styles.value}>{workerData.mtc}</Text>
            </Text>
            <Text style={[styles.infoText, { fontSize: RFValue(16, width) }]}>
              <Text style={styles.label}>Heure: </Text>
              <Text style={styles.time}>🕒 {currentTime}</Text>
            </Text>
          </View>

          <Text style={[styles.infoText, { fontSize: RFValue(16, width) }]}>
            <Text style={styles.label}>Nom & Prénom: </Text>
            <Text style={styles.value}>{workerData.full_name}</Text>
          </Text>
        </View>

        {/* Body */}
        <View style={{ height: 20 }} />
        <View
          style={[
            styles.dataContainer,
            {
              flexDirection: width < 380 ? "column" : "row",
            },
          ]}
        >
          {/* Left Column */}
          <View style={styles.column}>
            <View style={styles.card}>
              <Text style={styles.label}>Q. Produite</Text>
              <Text style={styles.value}>{workerData.quantity_today}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.label}>N° Paquet</Text>
              <Text style={styles.value}>{workerData.n_paquet}</Text>
            </View>
            <View
                style={[
                    styles.card,
                    workerData.quantity_today >= workerData.target_quantity_today
                    ? { backgroundColor: "#d1fae5" } // green
                    : { backgroundColor: "#fee2e2" } // red
                ]}
                >
                <Text style={styles.label}>Objectif</Text>
                <Text style={styles.value}>
                    {workerData.target_quantity_today}
                </Text>
                {workerData.quantity_today >= workerData.target_quantity_today ? (
                    <Text style={{ color: "green", fontWeight: "bold" }}>✅ Atteint</Text>
                ) : (
                    <Text style={{ color: "red", fontWeight: "bold" }}>⛔ Non atteint</Text>
                )}
                </View>

          </View>

          {/* Right Column */}
          <View style={styles.column}>
            <View style={styles.card}>
              <Text style={styles.label}>Quantité Heure Actuelle</Text>
              <Text style={styles.value}>{workerData.quantity_current_hour}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.label}>Opération</Text>
              <Text style={styles.value}>{workerData.operation}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.label}>Temps Unitaire</Text>
              <Text style={styles.value}>{workerData.temps_unitaire}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
  width: 200,
  height: 60,
  resizeMode: "contain",
  alignSelf: "center",
  marginBottom: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 10,
  },
  headerTitle: {
    fontWeight: "bold",
    color: "#1e40af",
    textAlign: "center",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  infoText: {
    flexWrap: "wrap",
  },
  label: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
  time: {
    fontSize: 14,
    color: "#777",
    marginLeft: 4,
  },
  dataContainer: {
    justifyContent: "space-between",
    gap: 10,
  },
  column: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
});
