import { createContext, useState } from 'react';
import askGemini from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function (){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async () => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    setPrevPrompts(prev => [...prev, input]);
    setRecentPrompt(input);
    const response = await askGemini(input);

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
            newResponse += responseArray[i];
        } else {
            newResponse += "<b>" + responseArray[i] + "</b>";
        }
    }

    let htmlFormattedResponse = newResponse.split("*").join("<br>");
    let newResponseArray = htmlFormattedResponse.split(" ");

    for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
};


    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt, 
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;