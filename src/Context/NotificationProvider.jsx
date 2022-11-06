import {React, createContext} from "react";
import {NotificationContainer} from "react-notifications";

import { NotificationManager } from "react-notifications"; 

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const createNotification = (type, massage, title) => {
        switch (type) {
        case "info":
            NotificationManager.info(massage);
            break;
        case "success":
            NotificationManager.success(massage, title);
            break;
        case "warning":
            NotificationManager.warning(massage, title, 3000);
            break;
        case "error":
            NotificationManager.error(massage, title, 5000, () => {
            alert("callback");
            });
            break;
        }
    };

    const notificationAddBook = (card) => {
      createNotification(
        "success",
        `Ви успішно додали книгу ${card.title} до свого каталогу`
      );
    }
    const notificationDeleteBook = (card) => {
        createNotification(
            "warning",
            `Ви видалили книгу ${card.title} зі свого каталогу`
        );
    };
    
  return (
    <NotificationContext.Provider
      value={{
        createNotification,
        notificationAddBook,
        notificationDeleteBook,
      }}
    >
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};
