import * as yup from "yup";
import { validation, hsFilesPage as strings } from "../../../constants/strings";

const searchHSFileSchema = yup.object().shape({
    hs: yup
        .string(validation.stringMessage.replace(":field", strings.hs))
        .max(
            6,
            validation.maxMessage
                .replace(":field", strings.hs)
                .replace(":max", "6")
        )
        .required(validation.requiredMessage.replace(":field", strings.hs)),
});

export default searchHSFileSchema;
