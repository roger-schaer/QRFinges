import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    screen: {
        padding: 50,
        paddingTop : 0,
        backgroundColor : "#f5f5f5",
    },

    text: {
        fontSize: 16,
        fontWeight: "700",
        color: "darkgreen",
       paddingBottom: 15,
    },

    textMenu: {
        fontSize: 16,
        color: "darkgreen",
        paddingTop: 10,
        paddingRight : 10,
        paddingLeft : 15,
    },

    content: {
        fontSize: 14,
        color: "darkgreen",
        paddingBottom: 20,
    },

    logoContainer: {
        marginBottom: 20,
        paddingBottom: 30,
    },

    title : {
        color : 'darkgreen',
        fontSize : 20,
        paddingBottom : 20,
        paddingTop : 10,
    },

    iconContainer: {
        color: "darkgreen",
        padding: 10,
    },

    input: {
        height: 30,
        borderBottomColor: 'darkgreen',
        borderBottomWidth: 1,
        marginVertical: 10,
        marginBottom: 20,

    },

    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor : "#f5f5f5",
    },

    buttonText: {
        fontSize: 40,
        color: "#087940",
        textDecorationLine: "underline",
        textAlign: "center",
    },

    iconSyncContainer: {
        color: "darkgreen",
        paddingTop: 20,
        paddingLeft: 150,
        alignItems: "center",
    },

    timerContainer: {
        flexDirection: "column",
    },

    timerText: {
        fontSize: 14,
        fontWeight: "400",
        color: "darkgreen",
        paddingRight: 30,
        paddingBottom: 20,
    },

    timerLine: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 35,
    },

    startContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        paddingBottom: 70,
    },
    barcodeBox: {
        marginVertical: 50,
        marginBottom: 20,
         alignItems: 'center',
         justifyContent: 'center',
         height: 250,
         width: 250,
         overflow: 'hidden',
         borderRadius: 30,
         borderStartColor: 'darkgreen'
    },
    customBtnGreen: {
        marginBottom: 20,
        backgroundColor: 'darkgreen',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 30,
        fontSize: 16,
        fontWeight: "700",
        
    },

    webviewer: {
        flex: 1,
        //flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 10,

    },
        

});