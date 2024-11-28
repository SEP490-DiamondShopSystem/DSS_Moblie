import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Sử dụng icon từ react-native-vector-icons
import { useNavigation } from "@react-navigation/native"; // Để điều hướng trang

const DeliveryHome = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="truck" size={40} color="#0077B6" />
        <Text style={styles.headerText}>
          Chào mừng bạn đến với trang giao hàng!
        </Text>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.infoText}>
          Tại đây bạn có thể theo dõi các đơn giao hàng và quản lý các nhiệm vụ
          giao hàng của mình.
        </Text>

        {/* Icon và văn bản miêu tả cho đơn hàng */}
        <View style={styles.infoCard}>
          <View style={{ flexDirection: "row" }}>
            <Icon name="list" size={30} color="#0077B6" />
            <Text style={styles.infoTitle}>Danh sách đơn hàng</Text>
          </View>
          <View>
            <Text style={styles.infoDescription}>
              Xem các đơn hàng cần giao và theo dõi tình trạng giao hàng.
            </Text>
          </View>
        </View>

        {/* Thông báo hoặc các yếu tố tương tác */}
        <View style={styles.actionContainer}>
          <Text style={styles.actionText}>
            Hãy bắt đầu theo dõi các đơn hàng giao của bạn!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 15,
    color: "#0077B6",
    textAlign: "center",
    flexWrap: "wrap",
  },
  body: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  infoText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
    color: "#333",
  },
  infoCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: "100%",
    maxWidth: 350,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0077B6",
    marginLeft: 10,
  },
  infoDescription: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  actionContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  actionText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
});

export default DeliveryHome;
