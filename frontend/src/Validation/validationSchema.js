import * as Yup from "yup";

const newChannelSchema = (data) =>
  Yup.object().shape({
    channelName: Yup.string()
      .min(3, "От 3 до 20 символов")
      .max(20, "От 3 до 20 символов")
      .required("Обязательное поле")
      .notOneOf(data, "Канал с таким именем уже существует"),
  });

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
});

const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "От 3 до 20 символов")
    .max(20, "От 3 до 20 символов")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Не менее 6 символов")
    .required("Обязательное поле"),
  confirmPassword: Yup.string()
    .required("Обязательное поле")
    .oneOf([Yup.ref("password"), null], "Пароли должны совпадать"),
});

export { newChannelSchema, loginSchema, signUpSchema };
