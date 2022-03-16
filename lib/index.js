"use babel"

import { markdownRenderer } from "inkdrop"
import { CodeColorCollection } from "./components/code-color-collection.jsx"

module.exports = {
    activate() {
        if (markdownRenderer) {
            console.log(markdownRenderer.remarkCodeComponents)
            markdownRenderer.remarkCodeComponents.color = CodeColorCollection
        }
    },
    deactivate() {
        if (markdownRenderer) {
            markdownRenderer.remarkCodeComponents.color = null
        }
    }
}