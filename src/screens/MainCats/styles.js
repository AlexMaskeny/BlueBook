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
        justifyContent: "space-around"
    },
    searchButton: {
        backgroundColor: globalColors.background1,
        flex: 1,
        height: 34,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    container: {
        flex: 1,
        backgroundColor: globalColors.background3,
        alignItems: "center",
    },  
    modalContainer: {
        backgroundColor: globalColors.background1,
        alignItems: "flex-start",
        padding: 10,
    },
    searchListing: {
        flexDirection: 'row',
        alignItems: "center",
        padding: 5,
        width: "100%"
    },
});

export default styles;