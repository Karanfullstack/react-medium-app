import "./App.css";

function App() {
	console.log(import.meta.env._VITE_APP_APPWRITE_URL);
	return <h1 className="text-white text-center">A Blog With Appwrite</h1>;
}

export default App;
