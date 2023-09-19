import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

const newChannelSchema = (data) =>
  Yup.object().shape({
    channelName: Yup.string()
      .min(3, "Минимум 2 буквы")
      .max(50, "Максимум 50 букв")
      .required("Обязательное поле")
      .notOneOf(data, "Non"),
  });

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Минимум 2 буквы")
    .max(50, "Максимум 50 букв")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(2, "Минимум 2 буквы")
    .max(50, "Максимум 50 букв")
    .required("Обязательное поле"),
});

const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Минимум 3 буквы")
    .max(20, "Максимум 20 букв")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(2, "Минимум 2 буквы")
    .max(50, "Максимум 50 букв")
    .required("Обязательное поле"),
  confirmPassword: Yup.string()
    .required("Обязательное поле")
    .oneOf([Yup.ref("password"), null], "Пароли не совпадают"),
});

export { newChannelSchema, loginSchema, signUpSchema };
