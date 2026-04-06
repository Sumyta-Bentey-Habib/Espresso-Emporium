import React, { useState, useEffect } from "react";
import { MessageSquare, User, Search, Globe, Clock } from "lucide-react";
import { useConversations } from "../../hooks/useChat";
import { API_URL } from "../../utils/utils";

const ChatList = ({ currentUser, onSelectConversation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchingGlobal, setIsSearchingGlobal] = useState(false);
  const { conversations, loading: conversationsLoading } = useConversations(currentUser.email);


  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      setIsSearchingGlobal(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingGlobal(true);
      try {
        const res = await fetch(`${API_URL}/users?search=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const users = await res.json();
          
          const filteredResults = users.filter(u =>
            u.email !== currentUser.email &&
            !conversations.some(c => c.participants.includes(u.email))
          );
          setSearchResults(filteredResults);
        }
      } catch (error) {
        console.error("Global search failed:", error);
      } finally {
        setIsSearchingGlobal(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, currentUser.email, conversations]);

  
  const matchedConversations = conversations.filter(conv => {
    const otherUserUid = conv.participants.find(uid => uid !== currentUser.uid);
    const otherUser = conv.participantDetails[otherUserUid] || { name: "User" };
    return otherUser.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full bg-white/95 backdrop-blur-xl overflow-hidden chat-container">

      <div className="chat-glass-dark p-6 text-white shrink-0">
        <h3 className="font-extrabold text-xl flex items-center gap-3 tracking-tight">
          <div className="p-2 bg-amber-500/20 rounded-xl">
            <MessageSquare size={22} className="text-amber-400" />
          </div>
          Messages
        </h3>
      </div>

      {}
      <div className="px-4 py-3 bg-amber-50/30 border-b border-amber-900/5">
        <div className="relative group">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-900/30 group-focus-within:text-amber-800 transition-colors" />
          <input
            type="text"
            placeholder="Search coffee enthusiasts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-amber-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all placeholder:text-amber-900/30"
          />
        </div>
      </div>

      {}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
        {isSearchingGlobal || (conversationsLoading && searchQuery === "") ? (
          <div className="flex flex-col justify-center items-center h-64 gap-3">
            <span className="loading loading-spinner loading-md text-amber-800"></span>
            <p className="text-xs font-medium text-amber-900/40 animate-pulse">Brewing your chats...</p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {}
            {matchedConversations.length > 0 && (
              <div className="py-2">
                <div className="px-5 py-2 text-[10px] font-black text-amber-900/30 uppercase tracking-[0.2em] flex items-center gap-2">
                  <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                  Recent Chats
                </div>
                {matchedConversations.map((conv) => {
                  const otherUserUid = conv.participants.find(email => email !== currentUser.email);
                  const otherUser = conv.participantDetails[otherUserUid] || { name: "User" };
                  const unread = conv.unreadCount?.[currentUser.email] || 0;
                  const isOnline = otherUser.lastActive && (new Date() - new Date(otherUser.lastActive)) < 7 * 60 * 1000;

                  return (
                    <button
                      key={conv.id}
                      onClick={() => onSelectConversation({ ...otherUser, uid: otherUserUid })}
                      className="w-full px-5 py-4 flex items-center gap-4 hover:bg-amber-50/50 active:bg-amber-100/50 transition-all border-b border-amber-900/5 text-left relative group"
                    >
                      <div className="relative shrink-0">
                        <UserAvatar user={otherUser} size="h-12 w-12" />
                        {isOnline && (
                          <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h4 className="font-bold text-amber-950 text-sm truncate group-hover:text-amber-800 transition-colors">{otherUser.name}</h4>
                          {conv.lastMessageAt && (
                            <span className="text-[10px] font-medium text-amber-900/40">
                              {new Date(conv.lastMessageAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <p className={`text-xs truncate ${unread > 0 ? "font-semibold text-amber-900" : "text-amber-900/50"}`}>
                            {conv.lastMessage || "Start chatting..."}
                          </p>
                          {unread > 0 && (
                            <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm shadow-amber-600/20">
                              {unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {}
            {searchResults.length > 0 && (
              <div className="py-2">
                <div className="px-5 py-2 text-[10px] font-black text-amber-900/30 uppercase tracking-[0.2em] flex items-center gap-2">
                  <div className="w-1 h-1 bg-amber-700 rounded-full"></div>
                  Global Results
                </div>
                {searchResults.map((u) => (
                  <button
                    key={u._id}
                    onClick={() => onSelectConversation({
                      name: u.name,
                      photo: u.image || u.photo,
                      role: u.role,
                      uid: u.email 
                    })}
                    className="w-full px-5 py-4 flex items-center gap-4 hover:bg-amber-50/50 transition-all border-b border-amber-900/5 text-left group"
                  >
                    <UserAvatar user={{ name: u.name, photo: u.image || u.photo }} size="h-12 w-12" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-amber-950 text-sm truncate group-hover:text-amber-800 transition-colors">{u.name}</h4>
                      <p className="text-[11px] font-medium text-amber-900/40 truncate capitalize tracking-wide">{u.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {}
            {matchedConversations.length === 0 && searchResults.length === 0 && (
              <div className="flex flex-col items-center justify-center p-12 text-center h-[400px]">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                  <Search size={32} className="text-amber-900/10" />
                </div>
                <p className="text-sm font-bold text-amber-900/60 mb-1">
                  {searchQuery.length >= 2 ? "No matches found" : "Find someone to chat"}
                </p>
                <p className="text-xs text-amber-900/40">
                  {searchQuery.length >= 2
                    ? `We couldn't find anyone named "${searchQuery}"`
                    : "Type a name to search globally"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const UserAvatar = ({ user, size = "h-12 w-12" }) => (
  user.photo ? (
    <img src={user.photo} alt={user.name} className={`${size} rounded-full object-cover border border-amber-100`} />
  ) : (
    <div className={`${size} rounded-full bg-amber-100 flex items-center justify-center text-amber-800 border border-amber-200`}>
      <User size={size === "h-10 w-10" ? 18 : 24} />
    </div>
  )
);

export default ChatList;
