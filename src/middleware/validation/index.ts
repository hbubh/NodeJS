import { cardSchemaJoi } from "../../joi/card_joi";
import { loginSchemaJoi } from "../../joi/login_joi";
import { registerSchemaJoi } from "../../joi/user_joi";
import { validateSchema } from "./validate-schema";

const validataUserRegister = validateSchema(registerSchemaJoi);
const validataUserLogin = validateSchema(loginSchemaJoi);
const validataCardAdd = validateSchema(cardSchemaJoi);

export { validataUserRegister, validataUserLogin, validataCardAdd };
