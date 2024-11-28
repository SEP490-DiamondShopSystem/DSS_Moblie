import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useDispatch } from "react-redux";
import { getAllOrder } from "../../redux/slices/orderSlice";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);

  const statusList = [
    { name: "Tất Cả", value: "", color: "gray" },
    { name: "Chờ Xử Lý", value: 1, color: "orange" },
    { name: "Đang Xử Lý", value: 2, color: "blue" },
    { name: "Từ Chối", value: 3, color: "red" },
    { name: "Hủy Đơn", value: 4, color: "gray" },
    { name: "Đã Chuẩn Bị", value: 5, color: "green" },
    { name: "Đang Vận Chuyển", value: 6, color: "yellow" },
    { name: "Vận Chuyển Thất Bại", value: 7, color: "red" },
    { name: "Thành Công", value: 8, color: "green" },
  ];

  useEffect(() => {
    dispatch(getAllOrder())
      .unwrap()
      .then((res) => {
        setOrderList(res?.Values || []);
      })
      .catch((error) => {
        Alert.alert(
          "Lỗi",
          error?.title || error?.data?.title || "Có lỗi xảy ra"
        );
      });
  }, [dispatch]);

  const handleViewDetails = (orderID) => {
    Alert.alert(
      "Chi Tiết Đơn Hàng",
      `Thông tin chi tiết của đơn hàng ${orderID}`
    );
  };

  const getStatusDetails = (statusValue) => {
    const status = statusList.find((item) => item.value === statusValue);
    return status
      ? { name: status.name, color: status.color }
      : { name: "Không xác định", color: "gray" };
  };

  const renderOrderItem = ({ item }) => {
    const { name, color } = getStatusDetails(item.Status);
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.orderNumber}>Đơn Hàng#: {item.OrderCode}</Text>
          <Text style={[styles.statusText, { color: color }]}>{name}</Text>
        </View>
        <Text style={styles.deliveryDate}>
          {item.Status === 8
            ? `Ngày Tạo ${item.CreatedDate}`
            : `Estimated Delivery on ${item.DeliveryDate}`}
        </Text>
        {/* <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>
            {item.Status === 8 ? "You Rated" : "Rating"}
          </Text>
          <Rating
            startingValue={item.Rating || 0}
            imageSize={20}
            readonly
            style={styles.rating}
          />
        </View> */}
        <TouchableOpacity
          onPress={() => handleViewDetails(item.OrderCode)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Xem Chi Tiết</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh Sách Đơn Hàng</Text>

      <FlatList
        data={orderList}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.Id.toString()}
        ListEmptyComponent={
          <Text style={styles.noDataText}>Không có đơn hàng nào được giao</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "500",
  },
  deliveryDate: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  ratingContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    color: "gray",
  },
  rating: {
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#dec986",
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "gray",
  },
  buttonText: {
    textAlign: "center",
  },
});

export default OrderScreen;
