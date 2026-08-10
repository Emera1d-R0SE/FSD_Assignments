import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <div>

            <Header />

            <main className="main-content">
                <h1 align="center">Welcome to my website</h1>
                <p align="center">This is the main content.</p>
            </main>

            <Footer />

        </div>
    );
}

export default App;
