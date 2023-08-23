import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const ClozeQuestionForm = ({ formData = {}, onChange }) => {
  const [sentence, setSentence] = useState(formData.sentence || "");
  const [clozeIndices, setClozeIndices] = useState(formData.clozeIndices || []);
  const [falseAnswers, setFalseAnswers] = useState(formData.falseAnswers || []);

  const excludedPunctuation = [" ", ".", ",", ":", ";"]; // Add any other punctuation marks you want to exclude

  const handleSentenceChange = (e) => {
   
    setSentence(e.target.value);
    onChange({ sentence: e.target.value, clozeIndices, falseAnswers , clozeQuestion: getClozeQuestion() });
  };

  const handleClozeIndexChange = (e, index) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setClozeIndices([...clozeIndices, index]);

      const words = sentence.split(" ");
      const wordToAdd = words[index];

      setFalseAnswers([...falseAnswers, wordToAdd]);
    } else {
      const updatedIndices = clozeIndices.filter((idx) => idx !== index);
      setClozeIndices(updatedIndices);
      onChange({ sentence, clozeIndices: [...clozeIndices], falseAnswers: [...falseAnswers], clozeQuestion: getClozeQuestion()  });
      const words = sentence.split(" ");
      const wordToRemove = words[index];
      const updatedFalseAnswers = falseAnswers.filter((answer) => answer !== wordToRemove);
      setFalseAnswers(updatedFalseAnswers);
      
    }

    const updatedFormData = {
      ...formData,
      clozeIndices,
      falseAnswers,
    };
    onChange({ sentence, clozeIndices: [...clozeIndices], falseAnswers: [...falseAnswers], clozeQuestion: getClozeQuestion()  });
  };

  const handleFalseAnswerChange = (e, index) => {
    const updatedFalseAnswers = [...falseAnswers];
    updatedFalseAnswers[index] = e.target.value;
    setFalseAnswers(updatedFalseAnswers);

    const updatedFormData = {
      ...formData,
      falseAnswers: updatedFalseAnswers,
    };
    onChange({ sentence, clozeIndices: [...clozeIndices], falseAnswers: [...updatedFalseAnswers] ,clozeQuestion: getClozeQuestion() });
  };

  const handleAddFalseAnswer = () => {
    setFalseAnswers([...falseAnswers, ""]);

    const updatedFormData = {
      ...formData,
      falseAnswers: [...falseAnswers, ""],
    };
    onChange({ sentence, clozeIndices: [...clozeIndices], falseAnswers: [...falseAnswers, ""],clozeQuestion: getClozeQuestion()  });
  };

  const handleDeleteFalseAnswer = (index) => {
    const updatedFalseAnswers = [...falseAnswers];
    updatedFalseAnswers.splice(index, 1);
    setFalseAnswers(updatedFalseAnswers);

    const updatedFormData = {
      ...formData,
      falseAnswers: updatedFalseAnswers,
    };
    onChange({ sentence, clozeIndices: [...clozeIndices], falseAnswers: [...updatedFalseAnswers] ,clozeQuestion: getClozeQuestion() });
  };

  const getClozeQuestion = () => {
    if (clozeIndices.length > 0) {
      const words = sentence.split(" ");
      clozeIndices.forEach((index) => {
        words[index] = "_";
      });
      return words.join(" ");
    }
    return "";
    
  };


  return (
    <div className="flex-1 bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white shadow-md p-6 w-[84%] rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create Cloze Question</h2>
        <div className="mb-4">
          <label htmlFor="sentence" className="block font-medium mb-2">
            Enter a Sentence:
          </label>
          <input
            type="text"
            id="sentence"
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200"
            value={sentence}
            onChange={handleSentenceChange}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Select Word(s) for Cloze:</label>
          <div>
            {sentence.split(" ").map((word, index) => {
              const isExcluded = excludedPunctuation.includes(word);
              if (!isExcluded) {
                return (
                  <label key={index} className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-500 h-5 w-5"
                      checked={clozeIndices.includes(index)}
                      onChange={(e) => handleClozeIndexChange(e, index)}
                    />
                    <span className="ml-2">{word}</span>
                  </label>
                );
              } else {
                return (
                  <span key={index} className="mr-4">
                    {word}
                  </span>
                );
              }
            })}
          </div>
        </div>

        {clozeIndices.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Cloze Question Preview:</h3>
            <p className="border rounded-lg p-4 bg-gray-100">{getClozeQuestion()}</p>
          </div>
        )}

        {clozeIndices.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Options:</h3>
            {falseAnswers.map((answer, index) => (
              <div key={index} className="mb-4">
                <div
                  className="flex items-center mb-2"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("falseAnswerIndex", index);
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    const sourceIndex = e.dataTransfer.getData("falseAnswerIndex");
                    const targetIndex = index;
                    if (sourceIndex !== targetIndex) {
                      const updatedFalseAnswers = [...falseAnswers];
                      const [removedAnswer] = updatedFalseAnswers.splice(sourceIndex, 1);
                      updatedFalseAnswers.splice(targetIndex, 0, removedAnswer);
                      setFalseAnswers(updatedFalseAnswers);
                    }
                  }}
                >
                  <DragIndicatorIcon
                    className="text-gray-500 mr-2"
                    style={{ cursor: "grab" }}
                    onMouseDown={(e) => (e.target.style.cursor = "grabbing")}
                    onMouseUp={(e) => (e.target.style.cursor = "grab")}
                    onMouseLeave={(e) => (e.target.style.cursor = "grab")}
                  />
                  <input
                    type="text"
                    className="w-1/3 px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200"
                    value={answer}
                    onChange={(e) => handleFalseAnswerChange(e, index)}
                    placeholder={`Option ${index + 1}`}
                  />
                  {index > 0 && (
                    <button
                      className="text-gray-500 font-medium mt-2"
                      onClick={() => handleDeleteFalseAnswer(index)}
                    >
                      <ClearIcon />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="flex">
              <button
                className="text-black font-medium mt-4 hover:text-green-700"
                onClick={handleAddFalseAnswer}
              >
                <AddCircleOutlineIcon className="text-green-700" /> Option
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClozeQuestionForm;
