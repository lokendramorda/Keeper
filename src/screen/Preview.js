import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarPage from "../components/SidebarPage";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Preview({ fN }) {
  const { email, formName } = useParams();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const { fId } = useParams();

  const formmName = fN || formName;

  const navigate = useNavigate();

  const storedUserEmail = localStorage.getItem("userEmail");

  const userEmail = storedUserEmail || email;

  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState(null);
  const [formLink, setFormLink] = useState("");
  const [showLink, setShowLink] = useState(false);
  const [clozeAnswers, setClozeAnswers] = useState([]);
  const [droppedInputs, setDroppedInputs] = useState([]);
  const [copied, setCopied] = useState(false);
  const [clozeAnswersC, setClozeAnswersC] = useState([]);
  const [dataformId, setDataformId] = useState("");

  const formId = dataformId || fId;

  const handleSubmit = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate("/createarea");
    }, 3000);
  };

  useEffect(() => {
    if (formData && formData.categorizeData) {
      const initialAnswers = formData.categorizeData.categories.map(
        (category) => Array.from({ length: category.answers.length }).fill("")
      );
      setClozeAnswersC(initialAnswers);
    }
  }, [formData]);

  const [droppedInputsC, setDroppedInputsC] = useState([]);

  console.log(formmName, userEmail);

  useEffect(() => {
    let apiUrl = "";

    if (userEmail && formmName) {
      apiUrl = `${BASE_URL}/api/auth/preview?userEmail=${userEmail}&formmName=${formmName}`;
    } else if (formId) {
      apiUrl = `${BASE_URL}/api/auth/preview?formId=${formId}`;
    }

    if (apiUrl) {
      axios
        .get(apiUrl)
        .then((response) => {
          setFormData(response.data);
          setDataformId(response.data._id);
        })
        .catch((error) => {
          console.error("Error fetching form data:", error);
        });
    }
  }, [userEmail, formmName, formId]);

  if (!formData) {
    return <div>Loading...</div>;
  }

  const GenerateLink = () => {
    setFormLink(`https://keeperhere.netlify.app/preview/${formId}`);
    setShowLink(true);
  };

  const handleLink = async () => {
    try {
      await navigator.clipboard.writeText(formLink);
      console.log("Form link copied to clipboard:", formLink);
      setCopied(true);
    } catch (error) {
      console.error("Error copying form link to clipboard:", error);
    }
  };

  const handleDragStartC = (e, answer) => {
    e.dataTransfer.setData("text/plain", answer.value);
    e.currentTarget.style.cursor = "grab";
  };

  const handleDragOverC = (e) => {
    e.preventDefault();
    e.currentTarget.style.cursor = "grabbing";
  };

  const handleDropC = (e, targetCategoryIndex, targetAnswerIndex) => {
    e.preventDefault();

    const droppedAnswerC = e.dataTransfer.getData("text/plain");

    setClozeAnswersC((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      if (!newAnswers[targetCategoryIndex]) {
        newAnswers[targetCategoryIndex] = [];
      }
      newAnswers[targetCategoryIndex][targetAnswerIndex] = droppedAnswerC;
      return newAnswers;
    });

    setDroppedInputsC((prevInputs) => [...prevInputs, targetCategoryIndex]);
  };

  const handleInputChangeC = (e, categoryIndex, inputIndex) => {
    const newClozeAnswersC = [...clozeAnswersC];
    newClozeAnswersC[categoryIndex][inputIndex] = e.target.value;
    setClozeAnswersC(newClozeAnswersC);
  };

  const handleDragEndC = (e) => {
    e.currentTarget.style.cursor = "auto";
  };

  //cloze
  const handleDragStart = (e, answer) => {
    e.dataTransfer.setData("text/plain", answer);
    e.currentTarget.style.cursor = "grab";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.cursor = "grabbing";
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const droppedAnswer = e.dataTransfer.getData("text/plain");

    setClozeAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = droppedAnswer;
      return newAnswers;
    });

    setDroppedInputs((prevInputs) => [...prevInputs, index]);
  };

  const handleInputChange = (e, index) => {
    const newClozeAnswers = [...clozeAnswers];
    newClozeAnswers[index] = e.target.value;
    setClozeAnswers(newClozeAnswers);
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.cursor = "auto";
  };

  return (
    <div className="flex">
      {success && (
        <div className="success absolute top-0 left-0 z-10">
          <p>Your response has been successfully submitted!</p>
        </div>
      )}
      <div className=" flex-1 bg-gray-100">
        <div className="flex-1  p-4 overflow-y-auto ">
          <div className="container mx-auto">
            <div className="w-[80%] mx-auto">
              {localStorage.getItem("token") ? (
                <>
                  {!showLink ? (
                    <button onClick={GenerateLink} class="continue-application mb-3">
                      <div>
                        <div class="pencil"></div>
                        <div class="folder">
                          <div class="top">
                            <svg viewBox="0 0 24 27">
                              <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                            </svg>
                          </div>
                          <div class="paper"></div>
                        </div>
                      </div>
                      Generate form link
                    </button>
                  ) : null}
                  {showLink ? (
                    <div className="flex flex-row mb-3">
                      {" "}
                      <button onClick={handleLink} class="continue-application">
                        <div>
                          <div class="pencil"></div>
                          <div class="folder">
                            <div class="top">
                              <svg viewBox="0 0 24 27">
                                <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                              </svg>
                            </div>
                            <div class="paper"></div>
                          </div>
                        </div>
                        {formLink}
                      </button>
                      {copied && (
                        <p className="flex text-green-600 items-center">
                          Copied to clipboard!
                        </p>
                      )}{" "}
                    </div>
                  ) : null}
                </>
              ) : null}

              <div className="p-4 mb-4 bg-white shadow-md rounded-lg">
                {formData.simpleQuizData.formImage !== null && (
                  <div className="h-[200px] w-1/3 border overflow-hidden rounded-md shadow-sm">
                    <img
                      src={formData.simpleQuizData.formImage}
                      alt="Form Image"
                      className="w-full max-h-60 overflow-hidden object-contain mb-2"
                    />
                  </div>
                )}
                <h1 className="text-2xl font-semibold mb-4">
                  {formData.simpleQuizData.formName}
                </h1>
                {formData.simpleQuizData &&
                  formData.simpleQuizData.qaList.length > 0 && (
                    <section className="mb-8">
                      <p className="mb-3">{formData.simpleQuizData.email}</p>
                      {formData.simpleQuizData.qaList.map((item, index) => (
                        <p key={index}>
                          <span className="font-bold">
                            Question {index + 1}:{" "}
                          </span>
                          <span className="ml-2">{item.question}</span>
                          <input className="mt-2 w-full bg-gray-200 p-1 rounded-md"></input>
                        </p>
                      ))}
                    </section>
                  )}
              </div>

              {formData.categorizeData &&
                formData.categorizeData.categories.length > 0 && (
                  <div className="p-4 mb-4 bg-white shadow-md rounded-lg mx-auto max-w-screen-md">
                    <section className="mb-8">
                      <h2 className="text-xl font-semibold mb-2">
                        Categorize Question:
                      </h2>
                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold mb-2">
                          Answers
                          <span className="text-[11px] ml-1">
                            (drag and drop)
                          </span>
                        </h3>
                        <div className="w-full flex flex-wrap">
                          {formData.categorizeData.categories.map(
                            (category, categoryIndex) => (
                              <div key={categoryIndex} className="mb-4">
                                {category.answers.map((option, optionIndex) => (
                                  <span
                                    key={optionIndex}
                                    className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md mr-2 mb-2 inline-block"
                                    draggable
                                    onDragStart={(e) =>
                                      handleDragStartC(e, option)
                                    }
                                  >
                                    {option.value}
                                  </span>
                                ))}
                              </div>
                            )
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          Categories
                        </h3>
                        <div className="w-full flex">
                          {formData.categorizeData.categories.map(
                            (category, categoryIndex) => (
                              <div
                                key={categoryIndex}
                                className="mr-auto ml-auto mb-auto p-4 bg-gray-100 rounded-lg shadow-md w-1/3"
                                style={{ marginBottom: "1rem" }}
                              >
                                <span className="flex justify-center">
                                  {category.name}
                                </span>
                                {Array.from({
                                  length: category.answers.length,
                                }).map((_, answerIndex) => (
                                  <input
                                    key={answerIndex}
                                    className="mt-2 w-full bg-gray-200 p-1 rounded-md"
                                    placeholder={`Answer ${answerIndex + 1}`}
                                    value={
                                      clozeAnswersC[categoryIndex] &&
                                      clozeAnswersC[categoryIndex][answerIndex]
                                        ? clozeAnswersC[categoryIndex][
                                            answerIndex
                                          ]
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleInputChangeC(
                                        e,
                                        categoryIndex,
                                        answerIndex
                                      )
                                    }
                                    onDrop={(e) =>
                                      handleDropC(e, categoryIndex, answerIndex)
                                    }
                                    onDragOver={(e) => e.preventDefault()}
                                  />
                                ))}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </section>
                  </div>
                )}

              {formData.clozeData && formData.clozeData.clozeQuestion && (
                <div className="p-4 mb-4 bg-white shadow-md rounded-lg mx-auto max-w-screen-md">
                  <section className="mb-8">
                    <h3 className="text-lg mb-4 font-semibold mb-2">
                      Cloze Question:
                    </h3>
                    <span className="font-bold mr-3">Question:</span>
                    <p>
                      {formData.clozeData.clozeQuestion
                        .split("_")
                        .map((part, index, arr) => (
                          <span key={index}>
                            {part}
                            {index !== arr.length - 1 && (
                              <input
                                type="text"
                                className={`border mb-5 mt-2 bg-gray-100 rounded p-1 mx-1 w-16 text-center ${
                                  droppedInputs.includes(index)
                                    ? "bg-green-200"
                                    : ""
                                }`}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragOver={(e) => handleDragOver(e)}
                                onDragEnd={(e) => handleDragEnd(e)}
                                value={clozeAnswers[index] || ""}
                                onChange={(e) => handleInputChange(e, index)}
                              />
                            )}
                          </span>
                        ))}
                    </p>
                    <h3 className="text-lg font-semibold mb-4">
                      Options
                      <span className="text-[11px] ml-1">(drag and drop)</span>
                    </h3>
                    <p>
                      {formData.clozeData.falseAnswers.map((item, index) => (
                        <span
                          key={index}
                          className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md mr-2 mb-2 inline-block"
                          draggable
                          onDragStart={(e) => handleDragStart(e, item)}
                        >
                          {item}
                        </span>
                      ))}
                    </p>
                  </section>
                </div>
              )}

              {formData.comprehensionData &&
                formData.comprehensionData.referenceImage !== null && (
                  <div className="p-4 mb-4 bg-white shadow-md rounded-lg mx-auto max-w-screen-md">
                    <section>
                      <h2 className="text-xl mb-5 font-semibold mb-2">
                        Comprehension Data
                      </h2>

                      <div className="h-[200px] w-1/3 mb-6 border overflow-hidden rounded-md shadow-sm">
                        <img
                          src={formData.comprehensionData.referenceImage}
                          className="w-full max-h-60 overflow-hidden  object-contain mb-2"
                        ></img>
                      </div>
                      <p className="mb-5">
                        <span className="font-bold mr-3">Reference Text: </span>
                        {formData.comprehensionData.referenceText}
                      </p>
                      {formData.comprehensionData.questions &&
                        formData.comprehensionData.questions.map(
                          (question, questionIndex) => (
                            <div key={questionIndex} className="mb-4">
                              <p className="font-semibold mb-3">
                                Question: {question.text}
                                {question.type === "shortText" && (
                                  <input className="mt-2 w-full bg-gray-200 p-1 rounded-md"></input>
                                )}
                              </p>
                              {question.type === "mcq" && (
                                <div className="flex flex-col">
                                  {question.options &&
                                    question.options.map(
                                      (option, optionIndex) => (
                                        <label className="checkbox-container">
                                          <input
                                            type="checkbox"
                                            className="hidden"
                                          />
                                          <div className="checkmark">
                                            <svg
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="#fff"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="check-icon hidden"
                                            >
                                              <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                          </div>
                                          {option}
                                        </label>
                                      )
                                    )}
                                </div>
                              )}
                            </div>
                          )
                        )}
                    </section>
                  </div>
                )}

              <div className="flex justify-center items-center">
                <button
                  className="preview-button flex justify-center items-center text-md bg-white hover:bg-black text-black border border-black hover:text-white font-bold rounded-full w-1/6 h-10 rounded ml-4"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
