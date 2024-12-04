import type {Component} from 'solid-js';

import MapComponent from "./components/MapComponent";
import NavComponent from "./components/NavComponent";

const App: Component = () => {
    return (
        <div>
            <NavComponent/>
            <MapComponent/>
        </div>
    );
};

export default App;
