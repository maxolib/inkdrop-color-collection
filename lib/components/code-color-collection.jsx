"use babel"

import { useState, useEffect } from "react"
import { contrastColor } from "../utils.js"
import { clipboard } from 'electron'

const ColorItem = (props) => {
    const [color, setColor] = useState(props.color)

    useEffect(() => {
        setColor(props.color.replace("#", ""))
    }, [])
    return (
        <button
            class="color-stack-box"
            style={{ background: props.color }}
            onClick={() => {
                clipboard.writeText(props.color.replace("#", ""))
                setColor("copied")
            }
            }
            onMouseOver={() => { setColor(props.color.replace("#", "")) }}
        >
            <div class="color-stack-content">
                <h3 style={{ color: contrastColor(props.color), padding: 0 }}>{color}</h3>
            </div>
        </button>
    )
}

const ColorStack = (props) => {
    const [opacity, setOpacity] = useState(1)
    return (
        <div
        >
            <div class="color-layer">
                <div class="color-stack"
                    onMouseOver={() => { setOpacity(0) }}
                    onMouseOut={() => { setOpacity(1) }}
                >
                    {
                        props.colors.map(color => (<ColorItem color={color}></ColorItem>))
                    }
                </div>
                {props.type && props.type == "gradient" &&
                    <div class="color-gradient" style={{ background: `linear-gradient(90deg, ${props.colors.join(", ")})`, opacity: opacity }} />
                }
            </div>
            {props.name &&
                <div class="color-text-center">
                    <h3>{props.name}</h3>
                </div>
            }
        </div>
    )
}

const ColorItemGradient = (props) => {
    const [color, setColor] = useState("#ffffff")

    useEffect(() => {
        if (props.colors.length < 1) return

        setColor(`${props.colors[0].replace("#", "")}, ${props.colors[1].replace("#", "")}`)
    }, [])
    return (
        <button
            class="color-stack-box"
            style={{ background: `linear-gradient(90deg, ${props.colors.join(", ")})` }}
            onClick={() => { setColor("copied") }}
            onMouseOver={() => { setColor(`${props.colors[0].replace("#", "")}, ${props.colors[1].replace("#", "")}`) }}
        >
            <div class="color-stack-content">
                <h3 style={{ color: "white", padding: 0 }}>{color}</h3>
            </div>
        </button>
    )
}

const ColorStackGradient = (props) => {
    return (
        <flex>
            <div class="color-stack">
                <ColorItemGradient colors={props.colors} />
            </div>
            {props.name &&
                <div class="color-text-center">
                    <h3>{props.name}</h3>
                </div>
            }
        </flex>
    )
}

export const CodeColorCollection = (props) => {
    const regexColors = /#(?:[0-9a-fA-F]{3}){1,2}/g
    const regexName = /^name:[ ]*(?<name>.+)$/m
    const regexType = /^type:[ ]*(?<type>.+)$/m

    const [result, setResult] = useState("loading...")

    useEffect(() => {
        const matchColors = props.children[0].match(regexColors)
        const matchName = props.children[0].match(regexName)
        const matchType = props.children[0].match(regexType)

        const data = { type: "solid" }
        data.colors = matchColors

        if (matchColors) {
            if (matchName)
                data.name = matchName.groups.name

            if (matchType && matchType.groups.type == "gradient") {
                data.type = "gradient"
            }
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