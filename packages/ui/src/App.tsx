import React, { useState, useEffect } from "react";
import { createClient } from "graphql-ws";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const eventApi = "http://localhost:3000/event/create";
  const wsClient = createClient({
    url: "ws://localhost:4000/graphql", // Adjust the URL to your WebSocket GraphQL endpoint
  });

  useEffect(() => {
    const unsubscribe = wsClient.subscribe(
      {
        query: `subscription {
        loadingStatus {
          isLoading
        }
      }`,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        next: (data: any) => {
          // Update loading state based on the incoming data
          setIsLoading(data.data.loadingStatus.isLoading);
        },
        error: (err) => console.error("Subscription error:", err),
        complete: () => console.log("Subscription completed"),
      }
    );

    return () => unsubscribe();
  }, []);

  const performAction = async (success: boolean) => {
    setIsLoading(true); // This might be redundant if you manage loading entirely from the server
    try {
      const response = await fetch(eventApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventType: "Add MDA",
          eventData: { empNo: 123 },
          eventSuccess: success,
        }),
      });
      console.log("Response received:", response);
    } catch (error) {
      console.error("Failed to send data:", error);
      setIsLoading(false); // Consider removing if the server will send a message to stop loading
    }
  };

  const handleSuccessClick = () => performAction(true);
  const handleFailureClick = () => performAction(false);

  return (
    <>
      <h1>CDP Event driven POC</h1>
      <div className="main-cont">
        <div className="building-block beige-bg">Step 1</div>
        <div className="building-block green-bg">Step 2</div>
        <div className="building-block red-bg">Step 3</div>
      </div>

      <div className="action-container">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <button onClick={handleSuccessClick}>Perform success action</button>
            <button onClick={handleFailureClick}>Perform failed action</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
