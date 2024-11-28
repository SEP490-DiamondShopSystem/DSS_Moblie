import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { DataTable, Button } from "react-native-paper";
import { useDispatch } from "react-redux";

const OrderScreen = () => {
  const dispatch = useDispatch();

  // useEffect(() => {

  // })
  const data = [
    {
      key: "1",
      orderID: "1234",
      customer: "Nguyễn Văn A",
      status: "Đang giao",
      date: "2024-11-28",
    },
    {
      key: "2",
      orderID: "1235",
      customer: "Trần Thị B",
      status: "Đã giao",
      date: "2024-11-27",
    },
    {
      key: "3",
      orderID: "1236",
      customer: "Lê Minh C",
      status: "Chờ giao",
      date: "2024-11-29",
    },
    {
      key: "4",
      orderID: "1237",
      customer: "Phan Anh D",
      status: "Đang giao",
      date: "2024-11-28",
    },
  ];

  // Hàm để xử lý việc hiển thị chi tiết đơn hàng
  const handleViewDetails = (orderID) => {
    Alert.alert(
      "Chi Tiết Đơn Hàng",
      `Thông tin chi tiết của đơn hàng ${orderID}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh Sách Đơn Hàng</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Số Đơn</DataTable.Title>
          <DataTable.Title>Khách Hàng</DataTable.Title>
          <DataTable.Title>Trạng Thái</DataTable.Title>
          <DataTable.Title>Ngày</DataTable.Title>
          <DataTable.Title>Chi Tiết</DataTable.Title>
        </DataTable.Header>

        {data.map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>{item.orderID}</DataTable.Cell>
            <DataTable.Cell>{item.customer}</DataTable.Cell>
            <DataTable.Cell>{item.status}</DataTable.Cell>
            <DataTable.Cell>{item.date}</DataTable.Cell>
            <DataTable.Cell>
              <Button
                mode="contained"
                onPress={() => handleViewDetails(item.orderID)}
              >
                Xem Chi Tiết
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
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
});

export default OrderScreen;
