"use babel";

import { markdownRenderer } from "inkdrop"
import { useState, useEffect } from "react"

const ColorTag = (props) => {
    return (
        <flex class="color-tag">
            <div class="color-tag-box" style={{ background: props.color }}></div>
            <a style={{ color: props.color }}>{props.color}<br /></a>
        </flex>
    )
}

const ColorStack = (props) => {
    return (
        <flex>
            <flex class="color-stack">
                {
                    props.colors.map(color => (<div class="color-stack-box" style={{ background: color }}></div>))
                }
            </flex>
            {props.name &&
                <div class="color-text-center">
                    <h3>{props.name}</h3>
                </div>
            }
        </flex>
    )
}

const CodeColor = (props) => {
    const regexColor = /#(?:[0-9a-fA-F]{3}){1,2}/g
    const regexName = /^name:[ ]*(?<name>.+)$/m

    const [result, setResult] = useState("loading...")

    useEffect(() => {
        const matchColor = props.children[0].match(regexColor)

        if (matchColor) {
            setResult(matchColor.map((color) => (<ColorTag color={color} />)) + "test")
        }
        else {
            setResult(props.children[0])
        }
    }, [props.children[0]])

    return (
        <div>
            {result}
        </div>
    )
}

const CodeColorCollection = (props) => {
    const regexColors = /#(?:[0-9a-fA-F]{3}){1,2}/g
    const regexName = /^name:[ ]*(?<name>.+)$/m

    const [result, setResult] = useState("loading...")

    useEffect(() => {
        const matchColors = props.children[0].match(regexColors)
        const matchName = props.children[0].match(regexName)

        const data = {}
        data.colors = matchColors
        if (matchName)
            data.name = matchName.groups.name

        if (matchColors) {
            setResult((<ColorStack {...data} />))
        }
        else {
            setResult(props.children[0])
        }
    }, [props.children[0]])

    return (
        <div>
            {result}
        </div>
    )
}

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