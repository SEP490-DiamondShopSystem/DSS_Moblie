import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailOrder,
  getOrderLoadingSelector,
} from "../../../redux/selectors";
import { getOrderLog } from "../../../redux/slices/logSlice";
import {
  getOrderDetail,
  handleOrder,
  handleOrderLogDeliver,
} from "../../../redux/slices/orderSlice";
import { Clarity, Color, Cut } from "../../../utils/constant";

const TrackOrderScreen = ({ route }) => {
  const { orderID } = route.params;
  const userDetail = useSelector(getDetailOrder);
  const loadingOrder = useSelector(getOrderLoadingSelector);
  const [order, setOrder] = useState(null);
  const [logs, setLogs] = useState(null);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState();

  //   console.log("logs", logs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetail(orderID))
      .unwrap()
      .then((res) => {
        setOrder(res?.data);
      })
      .catch((error) => {
        Alert.alert(
          "Lỗi",
          error?.title ||
            error?.data?.title ||
            "Đã xảy ra lỗi khi lấy thông tin đơn hàng"
        );
      });
  }, [orderID]);

  useEffect(() => {
    dispatch(getOrderLog(orderID))
      .unwrap()
      .then((res) => {
        setLogs(res?.data);
      })
      .catch((error) => {
        Alert.alert(
          "Lỗi",
          error?.title ||
            error?.data?.title ||
            "Đã xảy ra lỗi khi lấy thông tin trạng thái"
        );
      });
  }, [orderID]);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Cho phép chọn nhiều ảnh
      quality: 1,
    });

    if (!result.cancelled) {
      setImages(result.assets);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsMultipleSelection: false, // Không cho phép chọn nhiều ảnh khi chụp
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([result.assets[0]]);
    }
  };

  const deleteImage = (uri) => {
    setImages((prevImages) => prevImages.filter((image) => image.uri !== uri)); // Loại bỏ ảnh có uri tương ứng
  };

  const uploadImages = async () => {
    // Gọi dispatch để gửi lên action handleOrderLogDeliver
    dispatch(
      handleOrderLogDeliver({
        orderId: orderID, // ID đơn hàng
        message: description, // Mô tả
        images,
      })
    )
      .unwrap()
      .then((res) => {
        Alert.alert("Thành Công", "Gửi thông tin thành công");
      })
      .catch((error) => {
        Alert.alert("Lỗi", error.title || error.data.title);
      });
  };

  // Hàm lấy trạng thái đơn hàng
  const getOrderStatusText = (status) => {
    switch (status) {
      case 0:
        return "Đang chờ";
      case 1:
        return "Đã chuẩn bị";
      case 2:
        return "Hoàn tất";
      case 3:
        return "Đã bị xóa";
      default:
        return "Trạng thái không xác định";
    }
  };

  // Hàm xử lý khi bấm "Bắt đầu giao hàng"
  const handleStartDelivery = () => {
    if (order?.Status !== 5) {
      Alert.alert(
        "Thông báo",
        "Đơn hàng không đủ điều kiện để bắt đầu giao hàng."
      );
      return;
    }

    dispatch(handleOrder(orderID))
      .unwrap()
      .then(() => {
        Alert.alert("Thông báo", "Đơn hàng đã bắt đầu giao hàng.");
      })
      .catch((error) => {
        Alert.alert(
          "Lỗi",
          error?.message || "Đã xảy ra lỗi trong quá trình bắt đầu giao hàng."
        );
      });
  };

  // Render từng sản phẩm trong đơn hàng
  const renderOrderItem = ({ item }) => {
    const renderDiamond = item?.Diamond;
    const renderJewelry = item?.Jewelry;

    return (
      <View style={styles.orderItem}>
        <Image
          source={{
            uri:
              renderDiamond?.Thumbnail ||
              renderJewelry?.Thumbnail ||
              "https://via.placeholder.com/60",
          }}
          style={styles.productImage}
        />
        <View style={styles.productTextContainer}>
          {/* Hiển thị tên sản phẩm Diamond hoặc Jewelry */}
          <Text style={styles.productName}>
            {renderDiamond?.Title ||
              renderJewelry?.ModelCode ||
              "Sản phẩm chưa có tên"}
          </Text>
          {renderDiamond && <Text>{renderDiamond?.SerialCode}</Text>}

          {/* Hiển thị thông tin chi tiết Diamond */}
          {renderDiamond && (
            <Text style={styles.productDetails}>
              {renderDiamond?.DiamondShape?.ShapeName} |{" "}
              {Color[renderDiamond?.Color] || "N/A"} |{" "}
              {Cut[renderDiamond?.Cut] || "N/A"} |{" "}
              {renderDiamond?.Carat || "N/A"} |{" "}
              {Clarity[renderDiamond?.Clarity] || "N/A"}
            </Text>
          )}

          {/* Hiển thị thông tin chi tiết Jewelry */}

          {/* Hiển thị giá */}
          <Text style={styles.productPrice}>
            Giá: {item?.PurchasedPrice?.toLocaleString()} VND
          </Text>

          {/* Hiển thị trạng thái */}
          <Text style={styles.productStatus}>
            Trạng thái: {getOrderStatusText(item.Status)}
          </Text>
        </View>
      </View>
    );
  };

  // Render từng bước trạng thái trong Logs
  const renderLogItem = ({ item }) => {
    const dotColor =
      item.Status === 3 || item.Status === 4 || item.Status === 7
        ? "red" // Status 3, 4, 7 -> red
        : item.Status === 8
        ? "green" // Status 8 -> green
        : "#dec986"; // Default case (for other values)

    return (
      <View style={styles.stepItem}>
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
        <View style={styles.stepTextContainer}>
          <Text style={styles.stepText}>{item.Message}</Text>
          <Text style={styles.stepDate}>{item.CreatedDate}</Text>
        </View>
      </View>
    );
  };

  // Giao diện chính
  return (
    <View style={{ marginHorizontal: 10, marginTop: 20 }}>
      <FlatList
        data={order?.Items || []}
        ListHeaderComponent={
          <>
            {/* Phần chi tiết đơn hàng */}
            {order ? (
              <View style={styles.orderDetails}>
                <Text style={styles.orderNumber}>
                  Mã đơn hàng: {order.OrderCode}
                </Text>
                <Text style={styles.orderDate}>
                  Ngày tạo: {order.CreatedDate}
                </Text>
                <Text style={styles.shippingAddress}>
                  Địa chỉ giao hàng: {order.ShippingAddress}
                </Text>
                <Text style={styles.paymentMethod}>
                  Phương thức thanh toán: {order.PaymentMethod?.MappedName}
                </Text>
                <Text style={styles.expectedDate}>
                  Ngày dự kiến giao hàng: {order.ExpectedDate}
                </Text>
                {order?.UserRankAmountSaved && (
                  <Text style={styles.totalPrice}>
                    Thành viên thân thiết: -
                    {order.UserRankAmountSaved?.toLocaleString()} VND
                  </Text>
                )}
                <Text style={styles.totalPrice}>
                  Phí vận chuyển: {order.ShippingFee?.toLocaleString()} VND
                </Text>
                <Text style={styles.totalPrice}>
                  Tổng giá trị: {order.TotalPrice?.toLocaleString()} VND
                </Text>
              </View>
            ) : (
              <Text>Đang tải chi tiết đơn hàng...</Text>
            )}

            {/* Thêm nút Bắt đầu giao hàng */}
            {order?.Status === 5 && (
              <View style={styles.buttonContainer}>
                <Button
                  title="Bắt đầu giao hàng"
                  onPress={handleStartDelivery}
                  disabled={order?.Status !== 5} // Disable nếu trạng thái không phải 'Đã chuẩn bị'
                />
              </View>
            )}

            {/* Thêm nút Bắt đầu giao hàng */}
            {/* {order?.Status === 5 && (
              <View style={styles.buttonContainer}>
                <Button
                  title="Bắt đầu giao hàng"
                  onPress={handleStartDelivery}
                  disabled={order?.Status !== 5} // Disable nếu trạng thái không phải 'Đã chuẩn bị'
                />
              </View>
            )} */}

            <View style={{ padding: 20 }}>
              <Text>Chọn ảnh hoặc chụp ảnh:</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={pickImages}>
                  <Text style={styles.buttonText}>Chọn ảnh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                  <Text style={styles.buttonText}>Chụp ảnh</Text>
                </TouchableOpacity>
              </View>
              {Array.isArray(images) && images.length > 0 && (
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {images.map((image, index) => (
                    <View
                      key={index}
                      style={{ marginRight: 10, marginBottom: 10 }}
                    >
                      <Image
                        source={{ uri: image.uri }}
                        style={{ width: 100, height: 100 }}
                      />
                      <TouchableOpacity
                        onPress={() => deleteImage(image.uri)}
                        style={{ marginTop: 5 }}
                      >
                        <Text style={{ color: "red" }}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}

              <TextInput
                style={{
                  borderWidth: 1,
                  marginTop: 10,
                  padding: 10,
                  borderColor: "gray",
                  borderRadius: 5,
                }}
                placeholder="Mô tả ảnh"
                value={description}
                onChangeText={(text) => setDescription(text)}
              />

              <Button title="Gửi ảnh và mô tả" onPress={uploadImages} />
            </View>

            {/* Danh sách sản phẩm */}
            <Text style={styles.sectionTitle}>Sản phẩm trong đơn hàng</Text>
          </>
        }
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.Id.toString()}
        ListFooterComponent={
          <>
            {/* Các bước trạng thái đơn hàng */}
            <Text style={styles.sectionTitle}>
              Các bước trạng thái đơn hàng
            </Text>
            {order?.Logs?.length > 0 ? (
              <FlatList
                data={logs}
                renderItem={renderLogItem}
                keyExtractor={(item) => item.Id.toString()}
                reverse={true}
              />
            ) : (
              <Text>Không có bước trạng thái nào trong đơn hàng</Text>
            )}
          </>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
  },
  orderDetails: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  expectedDate: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  shippingAddress: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  paymentMethod: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  orderItem: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  productTextContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productDetails: {
    fontSize: 12,
    color: "gray",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  productStatus: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
  buttonContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepText: {
    fontSize: 14,
    color: "#333",
  },
  stepDate: {
    fontSize: 12,
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%", // Chiều rộng của container chứa các nút
  },
  button: {
    backgroundColor: "#dec986", // Màu nền của nút
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5, // Góc bo tròn

    alignItems: "center",
    justifyContent: "center",
    width: "50%", // Đảm bảo nút có chiều rộng vừa đủ
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TrackOrderScreen;
