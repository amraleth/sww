import type {Component} from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import MapComponent from "./components/MapComponent";
import NavComponent from "./components/NavComponent";

const App: Component = () => {
    return (
        <div class={styles.App}>
            <NavComponent/>
            <MapComponent/>
        </div>
    );
};

export default App;
