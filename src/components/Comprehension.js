import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const Comprehension = ({onChange}) => {
  const [referenceImage, setReferenceImage] = useState(null);
  const [referenceText, setReferenceText] = useState("");
  const [questions, setQuestions] = useState([
    { type: "mcq", text: "", options: ["", ""], answer: "" },
  ]);

  const handleReferenceImageChange = (e) => {
    const file = e.target.files[0];
    setReferenceImage(file);
    onChange({ referenceImage: file, referenceText, questions });
  };

  const handleReferenceTextChange = (e) => {
    setReferenceText(e.target.value);
    onChange({ referenceImage, referenceText: e.target.value, questions });
  };

  const handleQuestionChange = (questionIndex, key, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex][key] = value;
    setQuestions(updatedQuestions);
    onChange({ referenceImage, referenceText, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
    onChange({ referenceImage, referenceText, questions: updatedQuestions });
  };

  const handleAddOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { type: "mcq", text: "", options: ["", ""], answer: "" }]);
  };

  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleAddShortTextQuestion = () => {
    setQuestions([...questions, { type: "shortText", text: "" }]);
  };

  const renderMCQQuestion = (question, index) => {
    return (
      <div key={index} className="mb-4" data-index={index} draggable onDragStart={(e) => handleQuestionDragStart(e, index)} onDragOver={handleQuestionDragOver} onDrop={handleQuestionDrop}>
        <label className="block font-medium mb-1">{`Question ${index + 1}`}</label>
        <input
          type="text"
          className="w-full px-4 py-2 mb-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200"
          value={question.text}
          onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
          placeholder="Enter the question..."
        />
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex mb-2 items-center" data-question-index={index} data-option-index={optionIndex} draggable onDragStart={(e) => handleOptionDragStart(e, index, optionIndex)} onDragOver={handleOptionDragOver} onDrop={handleOptionDrop}>
           
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
              value={option}
              onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
              placeholder={`Option ${optionIndex + 1}`}
            />
            <button
              className="ml-2 text-gray-500"
              onClick={() => handleRemoveOption(index, optionIndex)}
            >
              <ClearIcon />
            </button>
          </div>
        ))}
        <button
          className="w-50 text-black mr-4 font-medium hover:text-green-700"
          onClick={() => handleAddOption(index)}
        >
          <AddCircleOutlineIcon className="text-green-700 mr-1 " />Option
        </button>
        <button
          className=" text-black font-medium mt-4 hover:text-red-700 "
          onClick={() => handleRemoveQuestion(index)}
        >
          <RemoveCircleOutlineIcon className="text-red-700 mr-1 " />Question
        </button>
      </div>
    );
  };

  const renderShortTextQuestion = (question, index) => {
    return (
      <div key={index} className="mb-4" data-index={index} draggable onDragStart={(e) => handleQuestionDragStart(e, index)} onDragOver={handleQuestionDragOver} onDrop={handleQuestionDrop}>
        <label className="block font-medium mb-1">{`Question ${index + 1}`}</label>
        <input
          type="text"
          className="w-full px-4 py-2 mb-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200"
          value={question.text}
          onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
          placeholder="Enter the short text question..."
        />
        <button
          className="w-50 text-black font-medium  hover:text-red-700 mt-4"
          onClick={() => handleRemoveQuestion(index)}
        >
          <RemoveCircleOutlineIcon className="text-red-700 mr-1" />Question
        </button>
      </div>
    );
  };

  const handleQuestionDragStart = (e, questionIndex) => {
    e.dataTransfer.setData("questionIndex", questionIndex);
  };

  const handleQuestionDragOver = (e) => {
    e.preventDefault();
  };

  const handleQuestionDrop = (e) => {
    e.preventDefault();
    const sourceQuestionIndex = e.dataTransfer.getData("questionIndex");
    const targetQuestionIndex = e.currentTarget.getAttribute("data-index");
    const updatedQuestions = [...questions];
    const questionToMove = updatedQuestions.splice(sourceQuestionIndex, 1)[0];
    updatedQuestions.splice(targetQuestionIndex, 0, questionToMove);
    setQuestions(updatedQuestions);
  };

  const handleOptionDragStart = (e, questionIndex, optionIndex) => {
    e.dataTransfer.setData("questionIndex", questionIndex);
    e.dataTransfer.setData("optionIndex", optionIndex);
  };

  const handleOptionDragOver = (e) => {
    e.preventDefault();
  };

  const handleOptionDrop = (e) => {
    e.preventDefault();
    const sourceQuestionIndex = e.dataTransfer.getData("questionIndex");
    const sourceOptionIndex = e.dataTransfer.getData("optionIndex");
    const targetQuestionIndex = e.currentTarget.getAttribute("data-question-index");
    const targetOptionIndex = e.currentTarget.getAttribute("data-option-index");
    const updatedQuestions = [...questions];
    const optionToMove = updatedQuestions[sourceQuestionIndex].options.splice(sourceOptionIndex, 1)[0];
    updatedQuestions[targetQuestionIndex].options.splice(targetOptionIndex, 0, optionToMove);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="flex-1 bg-gray-100 p-4 flex items-center justify-center">
      <div className="container w-[84%] mx-auto p-4 bg-white shadow-md p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Comprehension Questions</h1>
        <div className="mb-4">
          <label className="block font-medium mb-1">Upload Image :</label>
          <input
            type="file"
            className="mb-2"
            accept="image/*"
            onChange={handleReferenceImageChange}
          />
          {referenceImage && (
            <img
              src={URL.createObjectURL(referenceImage)}
              alt="Uploaded Reference"
              className="w-full max-h-60 object-contain mb-2"
            />
          )}
        </div>
        <label className="block font-medium mb-1">Reference Text :</label>
        <textarea
          className="w-full px-4 py-2 mb-4 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200"
          value={referenceText}
          onChange={handleReferenceTextChange}
          placeholder="Enter the reference text..."
        />

        <h2 className="text-xl font-bold mb-2">Questions</h2>
        {questions.map((question, index) => {
          if (question.type === "mcq") {
            return renderMCQQuestion(question, index);
          } else if (question.type === "shortText") {
            return renderShortTextQuestion(question, index);
          }
          return null;
        })}

        <button
          className="w-1/6 bg-white mr-2 text-black border border-gray-500 font-medium py-2 rounded-md transition-colors hover:text-white hover:bg-gray-500"
          onClick={handleAddQuestion}
        >
          MCQ
        </button>
        <button
          className="w-1/6 bg-white text-black border border-gray-500 font-medium py-2 rounded-md transition-colors hover:text-white hover:bg-gray-500"
          onClick={handleAddShortTextQuestion}
        >
          Short Text
        </button>
      </div>
    </div>
  );
};

export default Comprehension;
