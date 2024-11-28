import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Alert, BackHandler, StyleSheet, Text, View } from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";
import { login } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [invalidInput, setInvalidInput] = useState(true);

  // Chặn nút Back
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  // Xử lý đăng nhập
  const handleLogin = async () => {
    console.log("handleLogin");

    // Kiểm tra input
    // if (loginForm.username.trim() === "" || loginForm.password.trim() === "") {
    //   setErrorMessage("Vui lòng không bỏ trống!");
    //   setInvalidInput(false);
    //   return;
    // }

    // Tạo dữ liệu đăng nhập
    const data = {
      email: loginForm.email,
      password: loginForm.password,
      isExternalLogin: true,
      isStaffLogin: false,
    };

    // Gửi yêu cầu đăng nhập
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        console.log("res", res);

        if (res?.data?.accessToken) {
          try {
            // Giải mã token
            const decodedData = jwtDecode(res?.data?.accessToken);
            console.log("Decoded Token:", decodedData);

            // Lưu thông tin người dùng vào LocalStorage
            AsyncStorage.setItem("user", JSON.stringify(decodedData));
            AsyncStorage.setItem("userId", decodedData.UserId);

            console.log("Đăng nhập thành công!");
            setTimeout(() => {
              navigation.navigate("BottomTabNavigator");
            }, 500);
          } catch (decodeError) {
            console.error("Error decoding token:", decodeError);
            Alert.alert("Lỗi", "Không thể xử lý token. Vui lòng thử lại!");
          }
        } else {
          Alert.alert("Lỗi", "Không nhận được token từ server.");
        }
      })
      .catch((error) => {
        // const errorMessage =
        //   error?.data?.title || error?.title || "Đăng nhập thất bại!";
        console.error("Login Error:", errorMessage);
        Alert.alert("Lỗi", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <Text style={styles.secondaryText}>Vui lòng đăng nhập để tiếp tục</Text>

      {/* Tên đăng nhập */}
      <TextInput
        textColor="black"
        style={[
          styles.input,
          { borderColor: invalidInput ? "#4878D9" : "red" },
        ]}
        mode="outlined"
        placeholder="Email"
        onChangeText={(text) => {
          setLoginForm((prevState) => ({ ...prevState, email: text }));
          setInvalidInput(true);
        }}
        outlineColor={errorMessage && "red"}
        value={loginForm.username}
      />

      {/* Mật khẩu */}
      <TextInput
        textColor="black"
        mode="outlined"
        style={[
          styles.input,
          { borderColor: invalidInput ? "#4878D9" : "red" },
        ]}
        placeholder="Mật khẩu"
        onChangeText={(text) => {
          setLoginForm((prevState) => ({ ...prevState, password: text }));
          setInvalidInput(true);
        }}
        right={
          <TextInput.Icon
            color="#1646A9"
            forceTextInputFocus={false}
            icon={isHidePassword ? "eye-off" : "eye"}
            onPress={() => setIsHidePassword(!isHidePassword)}
          />
        }
        value={loginForm.password}
        secureTextEntry={isHidePassword}
        outlineColor={errorMessage && "red"}
      />

      {/* Nút Đăng nhập */}
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={handleLogin}
      >
        Đăng nhập
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonText}
        onPress={() => navigation.navigate("BottomTabNavigator")}
      >
        Deliverer
      </Button>

      {/* Hiển thị thông báo lỗi */}
      <Snackbar
        visible={!!errorMessage}
        duration={3000} // Hiển thị 3 giây
        onDismiss={() => setErrorMessage(null)}
        style={[styles.snackbarContainer, styles.snackbarContainerFail]}
      >
        {errorMessage}
      </Snackbar>

      {/* Hiển thị thông báo thành công */}
      <Snackbar
        visible={!!successMessage}
        duration={2000} // Hiển thị 2 giây
        onDismiss={() => setSuccessMessage("")}
        style={styles.snackbarContainer}
      >
        {successMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  secondaryText: {
    color: "#797979",
    marginBottom: 20,
    fontSize: 14,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#dec986",
    width: "100%",
    borderRadius: 12,
    paddingVertical: 6,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  snackbarContainer: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#1646A9",
  },
  snackbarContainerFail: {
    backgroundColor: "red",
  },
});

export default LoginScreen;
