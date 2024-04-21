import { createContext, useState } from "react";
import runChat from "../config/gemini.js";

export const Context = createContext(); // this is the initial syntax of the useState()

const ContextProvider = (props)=>{
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        }, 75*index)
    }
     const newChat = ()=>{
        setLoading(false)
        setShowResult(false)
     }

    const onSent = async (prompt)=>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt!==undefined){
            response = await runChat(prompt)
            setPrevPrompt(prompt)
        }
        else{
            setPrevPrompt(prev=>[...prev, input])
            setRecentPrompt(prompt);
            response = await runChat(input)
        }
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0 ;i < responseArray.length; i++){ 
            if (i===0|| i%2 !==1 ) {
               newResponse +=responseArray[i]; 
            }
            else{
                newResponse+="<b>"+responseArray[i]+"</b>";
            }
            
        }

        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ")
        for (let i = 0; i < newResponse2.length; i++) {
           const nextWord = newResponseArray[i]; 
           delayPara(i, nextWord+" ");
        }
        console.log(newResponse)
        setLoading(false)
        setInput("")

    }


    // these context states will be used widly as per concpt of useContext() hook 
    // so these states needs to be exported 
    const contextValue = {
        prevPrompt, // store previous prompt
        setPrevPrompt,// sets the previous pormpt
        onSent, // sending the prompt to gemini
        setRecentPrompt, // setting recent sent prompt 
        recentPrompt, // storing recent prompts
        showResult, // shows the result which came in the form of response
        loading, // it is boolean for checking the loading screen
        input , // takes the input from the input area
        setInput, // sets the new input state
        resultData,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )

};
export default ContextProvider