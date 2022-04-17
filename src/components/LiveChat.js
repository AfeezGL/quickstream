import React, { useEffect, useState } from "react";
import db, { timeStamp } from "../firebase";

const LiveChat = ({ streamId }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("stream id chat ", streamId);
    db.collection("streams")
      .doc(streamId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        setMessages(data);
      });
  }, [streamId]);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("submit clicked");
    if (text) {
      db.collection("streams").doc(streamId).collection("messages").add({
        sender: "annonymous",
        text,
        timestamp: timeStamp(),
      });

      setText("");
    }
  };

  const Message = ({ message }) => {
    return (
      <p>
        <strong>{message.data.sender}: </strong>
        {message.data.text}
      </p>
    );
  };

  return (
    <div>
      <h3>Live chat</h3>
      <div className="liveChat">
        <div className="messages">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <form onSubmit={submitForm}>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <input type="submit" value="send" className="submitBtn" />
        </form>
      </div>
    </div>
  );
};

export default LiveChat;
