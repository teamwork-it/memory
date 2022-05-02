import React from 'react';
import {createRoot} from "react-dom/client";
import {Container} from "./react/components/Container";

export default {
    load() {
        //Point d'entrée de notee App react
        // Si la div est présente dans le DOM alors on connecte react
        let reactApp = document.getElementById("react-app");
        if(reactApp) {
            const root = createRoot(reactApp)
            root.render(<Container/>)
        }
    }
}
