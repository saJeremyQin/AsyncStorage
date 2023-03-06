import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase(
    "menu.db"
    // {
    //     name:"Menu.db",
    //     location:"default"
    // },
    // () => {
    //     console.log("open");
    // },
    // error => {
    //     console.log(error);
    // }
);

// function openDatabase() {
//     if (Platform.OS === "web") {
//       return {
//         transaction: () => {
//           return {
//             executeSql: () => {},
//           };
//         },
//       };
//     }
  
//     const db = SQLite.openDatabase("menu.db");
//     return db;
// }
  
// export const db = openDatabase();
