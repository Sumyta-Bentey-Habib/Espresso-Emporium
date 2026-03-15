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
          // Filter out current user and users already in recent conversations
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

  // Filter conversations for the "Recent" section
  const matchedConversations = conversations.filter(conv => {
    const otherUserUid = conv.participants.find(uid => uid !== currentUser.uid);
    const otherUser = conv.participantDetails[otherUserUid] || { name: "User" };
    return otherUser.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-xl overflow-hidden border border-amber-200 w-80">

      <div className="bg-amber-800 p-4 text-white">
        <h3 className="font-bold flex items-center gap-2">
          <MessageSquare size={18} />
          Messages
        </h3>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-amber-50 bg-amber-50/20">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-900/40" />
          <input
            type="text"
            placeholder="Search people to chat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white rounded-full border border-amber-100 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Lists */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {isSearchingGlobal || (conversationsLoading && searchQuery === "") ? (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner text-amber-800"></span>
          </div>
        ) : (
          <>
            {/* Recent Conversations */}
            {matchedConversations.length > 0 && (
              <div className="mb-2">
                <div className="px-4 py-2 bg-amber-50/50 text-[10px] font-black text-amber-900/40 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={10} />
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
                      className="w-full p-4 flex items-center gap-3 hover:bg-amber-50 transition-colors border-b border-amber-50/50 text-left relative"
                    >
                      <div className="relative">
                        <UserAvatar user={otherUser} size="h-10 w-10" />
                        {isOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-bold text-amber-950 text-xs truncate">{otherUser.name}</h4>
                          {conv.lastMessageAt && (
                            <span className="text-[9px] text-amber-900/40">
                              {new Date(conv.lastMessageAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-center mt-0.5">
                          <p className={`text-[10px] truncate ${unread > 0 ? "font-semibold text-amber-900" : "text-amber-900/60"}`}>
                            {conv.lastMessage || "Start chatting..."}
                          </p>
                          {unread > 0 && (
                            <span className="bg-amber-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
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

            {/* Global Results */}
            {searchResults.length > 0 && (
              <div>
                <div className="px-4 py-2 bg-amber-800 text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <Globe size={10} />
                  Global Results
                </div>
                {searchResults.map((u) => (
                  <button
                    key={u._id}
                    onClick={() => onSelectConversation({
                      name: u.name,
                      photo: u.image || u.photo,
                      role: u.role,
                      uid: u.email // Using email as uid for chat identification
                    })}
                    className="w-full p-4 flex items-center gap-3 hover:bg-amber-50 transition-colors border-b border-amber-50/50 text-left"
                  >
                    <UserAvatar user={{ name: u.name, photo: u.image || u.photo }} size="h-10 w-10" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-amber-950 text-xs truncate">{u.name}</h4>
                      <p className="text-[10px] text-amber-900/40 truncate capitalize">{u.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Empty State */}
            {matchedConversations.length === 0 && searchResults.length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 text-center text-amber-900/40 h-64">
                <Search size={40} className="mb-2 opacity-20" />
                <p className="text-xs">
                  {searchQuery.length >= 2
                    ? `No users found matching "${searchQuery}"`
                    : searchQuery === ""
                      ? "Start by searching for someone"
                      : "Type at least 2 characters to search..."}
                </p>
              </div>
            )}
          </>
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
