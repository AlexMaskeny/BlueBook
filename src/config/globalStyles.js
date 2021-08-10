import Constants from "expo-constants";
const itemRadius = {borderRadius: 6};
const headerHeight = 80;
const footerHeight = 50+Constants.statusBarHeight/1.5;

export default {
    font: {
        ...Platform.select({
            ios: {
                fontFamily: "Helvetica",
            },
            andriod: {
                fontFamily: "Roboto",
            },
        }),
    },
    itemRadius,
    headerHeight,
    footerHeight,
}