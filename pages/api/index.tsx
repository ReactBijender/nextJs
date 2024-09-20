// MyComponent.jsx
import { useEffect, useState } from "react";

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState({ message: "Error" });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        console.log("ppppppp response=>", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log("ppppppp result=>", result);
        // setError({ message2: "Error" });
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log("ppppppp 79=>", data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.message}</div>;
  console.log("ppppppp=>", data);
  return (
    <ul>
      {data.map((todo: any) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default MyComponent;
