function App() {
  const onClick = async () => {
    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <button onClick={() => onClick()}>CheckServer</button>
    </>
  )
}

export default App
