<template>
  <div class="log_bc">
    <div class="log_title">小店</div>
    <div class="login-card">
      <!-- <div class="title">
        <img src="@/assets/images/logo.gif" />
      </div> -->
      <div class="log_form">
        <div class="title">Login</div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          @keyup.enter="loginClick">
          <el-form-item prop="userName">
            <el-input
              v-model.trim="loginForm.userName"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginForm.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password />
          </el-form-item>
          <el-button
            :loading="loading"
            size="large"
            class="log_btn_box"
            circle
            :icon="Right"
            @click.prevent="loginClick" />
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { User, Lock, Loading, Right } from "@element-plus/icons-vue";
import { type FormInstance, FormRules } from "element-plus";
import { type IloginRequestData } from "@/api/login/login";
import loginApi from "@/api/login";

const router = useRouter();
const loginFormRef = ref<FormInstance | null>(null);

/** 登录按钮 Loading */
const loading = ref(false);
/** 登录表单数据 */
const loginForm: IloginRequestData = reactive({
  userName: "admin",
  password: "123456",
});
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" },
  ],
};
/** 登录逻辑 */
const loginClick = () => {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      loginApi
        .login({
          userName: loginForm.userName,
          password: loginForm.password,
        })
        .then((res) => {
          router.push({ path: "/dashBoard/home" });
        })
        .catch(() => {
          // createCode()
          loginForm.password = "";
        })
        .finally(() => {
          loading.value = false;
        });
    } else {
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
.log_bc {
  height: 100%;
  width: 100%;
  background-color: #f5f7f9;
  .log_title {
    position: absolute;
    top: 20px;
    left: 50px;
    font-size: 30px;
  }
  .log_form {
    width: 20%;
    position: absolute;
    top: 30%;
    transform: translateY(-50%);
    left: 50%;
    transform: translateX(-50%);
    padding: 70px;
    border: 1px solid #001529;
    background-color: #001529;
    border-radius: 10px;
    .title {
      text-align: center;
      position: absolute;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 20px;
      color: #ffffff;
    }
    .el-form-item {
      margin-top: 10px;
    }
    .log_btn_box {
      height: 70px;
      width: 70px;
      position: absolute;
      top: 90px;
      right: 30px;
      background-color: #001529;
      display: flex;
      align-items: center;
      justify-content: center;
      // border-radius: 50%;
      z-index: 10;
      border-color: #001529;
      :deep(.el-icon) {
        border: 1px solid #1890ff;
        border-radius: 50%;
        padding: 10px;
        height: 20px;
        width: 20px;
        svg {
          height: 20px !important;
          width: 20px !important;
        }
      }
    }
  }
}
</style>
