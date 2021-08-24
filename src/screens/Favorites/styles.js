import { StyleSheet } from "react-native";
import globalColors from "../../config/globalColors";
import globalStyles from "../../config/globalStyles";

const styles = StyleSheet.create({
    page: {

    },
    topBar1: {
        height: globalStyles.headerHeight,
        backgroundColor: globalColors.primary,
        padding: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
});

export default styles;