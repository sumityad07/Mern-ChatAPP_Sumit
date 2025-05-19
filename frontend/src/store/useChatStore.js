import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isMessageLoading: false,
  isUserLoading: false,



  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessageLoading: false });
    }
  },
  
  sendMessage:async (messageData)=>{
    const {messages,selectedUser} =get()
    try {
        const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData)
        set({messages:[...messages,res.data]})
    } catch (error) {
         toast.error(error?.response?.data?.message || "Failed to fetch users");
    }

  },


  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
socket.on("newMessage", (newMessage) => {
  const { selectedUser } = get();
  const { authUser } = useAuthStore.getState();

  // If the message involves the selected user and authUser, update messages
  const isChatRelevant =
    (newMessage.senderId === selectedUser?._id && newMessage.receiverId === authUser._id) ||
    (newMessage.senderId === authUser._id && newMessage.receiverId === selectedUser?._id);

  if (!isChatRelevant) return;

  set({
    messages: [...get().messages, newMessage],
  });
});

  },
unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },


  

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
