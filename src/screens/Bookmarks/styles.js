import { StyleSheet } from "react-native";
import globalColors from "../../config/globalColors";
import globalStyles from "../../config/globalStyles";

const styles = StyleSheet.create({
    page: {

    },
    topBar1: {
        height: globalStyles.headerHeight,
        backgroundColor: globalColors.primary,
        padding: 5,
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 10,
    },
});

export default styles;