import { useParams } from "react-router-dom";

export const ChatPage = () => {
  const { id } = useParams();
  console.log("Chat ID:", id);

  return (
    <div>
      <h1>Chat Page</h1>
      <p>Chat ID: {id}</p>
    </div>
  );
};
