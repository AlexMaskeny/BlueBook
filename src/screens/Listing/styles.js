import { StyleSheet } from "react-native";
import globalColors from "../../config/globalColors";
import globalStyles from "../../config/globalStyles";

const styles = StyleSheet.create({
    page: {
        backgroundColor: globalColors.background4,
        flex: 1,
    },
    bottomPage: {
        flex: 1,
        padding: 10,
    },
    topBar1: {
        height: globalStyles.headerHeight,
        backgroundColor: globalColors.primary,
        padding: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    Bio: {
        paddingHorizontal: 5,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: globalColors.background1,
    }
});

export default styles;