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
    topBar2: {
        height: 50,
        backgroundColor: globalColors.primary,
        padding: 5,
        paddingHorizontal: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    Bio: {
        paddingHorizontal: 5,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: globalColors.background1,
    },
    searchButton: {
        backgroundColor: globalColors.background2,
        flex: 1,
        height: 30,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
});

export default styles;