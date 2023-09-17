import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";



const newChannelSchema = (data) =>  Yup.object().shape({
  channelName: Yup.string()
    .min(3, "Минимум 2 буквы")
    .max(50, "Максимум 50 букв")
    .required("Обязательное поле")
    .notOneOf(data, "Non")
});

export {newChannelSchema}
