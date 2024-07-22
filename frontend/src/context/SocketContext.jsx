import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    if (authUser) {
      const socket = io("/socket.io", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      // Listen for online users
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Listen for attendance events
      socket.on("attendanceMarked", (attendance) => {
        setAttendanceRecords((prevRecords) => [...prevRecords, attendance]);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, attendanceRecords }}>
      {children}
    </SocketContext.Provider>
  );
};
