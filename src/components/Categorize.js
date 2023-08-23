import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const QuestionForm = ({onChange}) => {
  const [question, setQuestion] = useState("");
  const [categories, setCategories] = useState([
    { name: "", answers: [{ value: "" }] },
  ]);


  const handleAddCategory = () => {
    setCategories([...categories, { name: "", answers: [{ value: "" }] }]);
  };

  const handleDeleteCategory = (categoryIndex) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(categoryIndex, 1);
    setCategories(updatedCategories);
  };

  const handleCategoryChange = (categoryIndex, value) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].name = value;
    setCategories(updatedCategories);
    onChange({ question, categories });
  };

  const handleAddAnswer = (categoryIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].answers.push({ value: "" });
    setCategories(updatedCategories);
    onChange({ question, categories });
  };

  const handleDeleteAnswer = (categoryIndex, answerIndex) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].answers.splice(answerIndex, 1);
    setCategories(updatedCategories);
    onChange({ question, categories });
  };

  const handleAnswerChange = (categoryIndex, answerIndex, value) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].answers[answerIndex].value = value;
    setCategories(updatedCategories);
    onChange({ question, categories });
  };

  const handleDragStart = (e, categoryIndex, answerIndex) => {
   
    e.dataTransfer.setData("categoryIndex", categoryIndex);
    e.dataTransfer.setData("answerIndex", answerIndex);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetCategoryIndex, targetAnswerIndex) => {
    const sourceCategoryIndex = e.dataTransfer.getData("categoryIndex");
    const sourceAnswerIndex = e.dataTransfer.getData("answerIndex");
    const updatedCategories = [...categories];

    
    const answerToMove = updatedCategories[sourceCategoryIndex].answers.splice(
      sourceAnswerIndex,
      1
    )[0];
    updatedCategories[targetCategoryIndex].answers.splice(
      targetAnswerIndex,
      0,
      answerToMove
    );

    
    setCategories(updatedCategories);
  };

  return (
    <div className="flex-1 bg-gray-100 p-6 flex items-center justify-center">
      <form className="bg-white shadow-md p-6 rounded-lg w-[84%]">
        <h1 className="text-2xl font-bold mb-4">Categorize Questions</h1>
        <div className="mb-4">
          <label htmlFor="question" className="block font-medium mb-1">
            Question
          </label>
          <input
            type="text"
            id="question"
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <div className="flex items-center mb-2">
              <label
                htmlFor={`category-${categoryIndex}`}
                className="block font-medium"
              >
                Category {categoryIndex + 1}
              </label>
              {categoryIndex > 0 && (
                <button
                  type="button"
                  className="text-gray-500 ml-auto ml-2 focus:outline-none"
                  onClick={() => handleDeleteCategory(categoryIndex)}
                >
                  <DeleteIcon />
                </button>
              )}
            </div>
            <input
              type="text"
              id={`category-${categoryIndex}`}
              className="w-1/2 px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-black focus:ring-green-200"
              value={category.name}
              onChange={(e) =>
                handleCategoryChange(categoryIndex, e.target.value)
              }
              required
              placeholder="Category name"
            />
            <div className="mt-2">
              {category.answers.map((answer, answerIndex) => (
                <div
                  key={answerIndex}
                  className="flex items-center mb-2"
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, categoryIndex, answerIndex)
                  }
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, categoryIndex, answerIndex)}
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
                    value={answer.value}
                    onChange={(e) =>
                      handleAnswerChange(
                        categoryIndex,
                        answerIndex,
                        e.target.value
                      )
                    }
                    required
                    placeholder={`Option ${answerIndex + 1}`}
                  />
                  {answerIndex > 0 && (
                    <button
                      type="button"
                      className="text-gray-500 ml-2 focus:outline-none"
                      onClick={() =>
                        handleDeleteAnswer(categoryIndex, answerIndex)
                      }
                    >
                      <ClearIcon />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="text-black font-medium mt-4 hover:text-green-700"
                onClick={() => handleAddAnswer(categoryIndex)}
              >
                <AddCircleOutlineIcon className="text-green-700" /> Option
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="text-black font-medium mt-4 hover:text-green-700"
          onClick={handleAddCategory}
        >
          <AddCircleOutlineIcon className="text-green-700" /> Category
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
