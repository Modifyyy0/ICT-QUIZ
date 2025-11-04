import React, { useState, useEffect } from 'react';
import { ChevronRight, Trophy, Star } from 'lucide-react';

const App = () => {
  const [language, setLanguage] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Quiz data in both languages
  const quizData = {
    en: [
      {
        question: "What is the capital of France?",
        image: "https://placehold.co/400x300/4F46E5/FFFFFF?text=Paris",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        explanation: "Paris is the capital and most populous city of France."
      },
      {
        question: "Which planet is known as the Red Planet?",
        image: "https://placehold.co/400x300/DC2626/FFFFFF?text=Mars",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        explanation: "Mars appears reddish due to iron oxide (rust) on its surface."
      },
      {
        question: "What is the largest mammal in the world?",
        image: "https://placehold.co/400x300/059669/FFFFFF?text=Blue+Whale",
        options: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
        correctAnswer: 2,
        explanation: "The blue whale is the largest animal ever known to have existed."
      },
      {
        question: "Which element has the chemical symbol 'O'?",
        image: "https://placehold.co/400x300/7C3AED/FFFFFF?text=Oxygen",
        options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
        correctAnswer: 1,
        explanation: "Oxygen is essential for human respiration and has the symbol 'O'."
      },
      {
        question: "What is the tallest mountain in the world?",
        image: "https://placehold.co/400x300/1E40AF/FFFFFF?text=Mount+Everest",
        options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
        correctAnswer: 2,
        explanation: "Mount Everest stands at 8,848.86 meters (29,031.7 feet) above sea level."
      },
      {
        question: "Which country is known as the Land of the Rising Sun?",
        image: "https://placehold.co/400x300/DC2626/FFFFFF?text=Japan",
        options: ["China", "Korea", "Japan", "Thailand"],
        correctAnswer: 2,
        explanation: "Japan is called the Land of the Rising Sun due to its eastern location."
      },
      {
        question: "What is the largest ocean on Earth?",
        image: "https://placehold.co/400x300/0891B2/FFFFFF?text=Pacific+Ocean",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3,
        explanation: "The Pacific Ocean covers more than 60 million square miles."
      },
      {
        question: "Which animal is known as the 'Ship of the Desert'?",
        image: "https://placehold.co/400x300/F59E0B/FFFFFF?text=Camel",
        options: ["Horse", "Elephant", "Camel", "Donkey"],
        correctAnswer: 2,
        explanation: "Camels are well-adapted to desert conditions and can carry heavy loads."
      },
      {
        question: "What is the main ingredient in guacamole?",
        image: "https://placehold.co/400x300/16A34A/FFFFFF?text=Avocado",
        options: ["Tomato", "Onion", "Avocado", "Lime"],
        correctAnswer: 2,
        explanation: "Avocado is the primary ingredient that gives guacamole its creamy texture."
      },
      {
        question: "Which famous scientist developed the theory of relativity?",
        image: "https://placehold.co/400x300/78716C/FFFFFF?text=Einstein",
        options: ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Stephen Hawking"],
        correctAnswer: 2,
        explanation: "Albert Einstein revolutionized physics with his theory of relativity."
      }
    ],
    zh: [
      {
        question: "法国的首都是什么？",
        image: "https://placehold.co/400x300/4F46E5/FFFFFF?text=巴黎",
        options: ["伦敦", "柏林", "巴黎", "马德里"],
        correctAnswer: 2,
        explanation: "巴黎是法国的首都和人口最多的城市。"
      },
      {
        question: "哪个行星被称为红色星球？",
        image: "https://placehold.co/400x300/DC2626/FFFFFF?text=火星",
        options: ["金星", "火星", "木星", "土星"],
        correctAnswer: 1,
        explanation: "火星因其表面的氧化铁（铁锈）而呈现红色。"
      },
      {
        question: "世界上最大的哺乳动物是什么？",
        image: "https://placehold.co/400x300/059669/FFFFFF?text=蓝鲸",
        options: ["大象", "长颈鹿", "蓝鲸", "河马"],
        correctAnswer: 2,
        explanation: "蓝鲸是有史以来已知最大的动物。"
      },
      {
        question: "哪个元素的化学符号是'O'？",
        image: "https://placehold.co/400x300/7C3AED/FFFFFF?text=氧气",
        options: ["金", "氧气", "锇", "鿫"],
        correctAnswer: 1,
        explanation: "氧气对人类呼吸至关重要，其符号为'O'。"
      },
      {
        question: "世界上最高的山峰是什么？",
        image: "https://placehold.co/400x300/1E40AF/FFFFFF?text=珠穆朗玛峰",
        options: ["K2", "干城章嘉峰", "珠穆朗玛峰", "洛子峰"],
        correctAnswer: 2,
        explanation: "珠穆朗玛峰海拔8,848.86米（29,031.7英尺）。"
      },
      {
        question: "哪个国家被称为日出之国？",
        image: "https://placehold.co/400x300/DC2626/FFFFFF?text=日本",
        options: ["中国", "韩国", "日本", "泰国"],
        correctAnswer: 2,
        explanation: "由于日本位于东方，被称为日出之国。"
      },
      {
        question: "地球上最大的海洋是什么？",
        image: "https://placehold.co/400x300/0891B2/FFFFFF?text=太平洋",
        options: ["大西洋", "印度洋", "北冰洋", "太平洋"],
        correctAnswer: 3,
        explanation: "太平洋覆盖面积超过6,000万平方英里。"
      },
      {
        question: "哪种动物被称为'沙漠之舟'？",
        image: "https://placehold.co/400x300/F59E0B/FFFFFF?text=骆驼",
        options: ["马", "大象", "骆驼", "驴"],
        correctAnswer: 2,
        explanation: "骆驼适应沙漠环境，能承载重物。"
      },
      {
        question: "鳄梨酱的主要成分是什么？",
        image: "https://placehold.co/400x300/16A34A/FFFFFF?text=牛油果",
        options: ["番茄", "洋葱", "牛油果", "青柠"],
        correctAnswer: 2,
        explanation: "牛油果是鳄梨酱的主要成分，赋予其奶油般的质地。"
      },
      {
        question: "哪位著名科学家提出了相对论？",
        image: "https://placehold.co/400x300/78716C/FFFFFF?text=爱因斯坦",
        options: ["艾萨克·牛顿", "伽利略·伽利莱", "阿尔伯特·爱因斯坦", "斯蒂芬·霍金"],
        correctAnswer: 2,
        explanation: "阿尔伯特·爱因斯坦用相对论彻底改变了物理学。"
      }
    ]
  };

  const currentQuiz = language ? quizData[language][currentQuestion] : null;

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
  };

  const handleOptionSelect = (optionIndex) => {
    if (showResult) return;
    setSelectedOption(optionIndex);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setUserAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const calculateScore = () => {
    let score = 0;
    const quiz = quizData[language];
    for (let i = 0; i < 10; i++) {
      if (userAnswers[i] === quiz[i].correctAnswer) {
        score++;
      }
    }
    return score;
  };

  const resetQuiz = () => {
    setLanguage(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
  };

  // Language selection screen
  if (!language) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Welcome to Quiz!
          </h1>
          <div className="space-y-4">
            <button
              onClick={() => handleLanguageSelect('en')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 text-lg"
            >
              English
            </button>
            <button
              onClick={() => handleLanguageSelect('zh')}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 text-lg"
            >
              中文
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results screen (after 10th question)
  if (currentQuestion === 10) {
    const score = calculateScore();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <div className="bg-white rounded-full w-28 h-28 flex items-center justify-center">
                <span className="text-5xl font-bold text-orange-600">
                  {score}/10
                </span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {language === 'en' ? 'Congratulations!' : '恭喜！'}
            </h2>
            <div className="bg-green-100 border-2 border-green-300 rounded-xl p-4 mb-6">
              <p className="text-green-800 text-lg font-semibold mb-2">
                {score}/10 {language === 'en' ? 'Correct Answers!' : '正确答案！'}
              </p>
              <p className="text-green-700 text-sm leading-relaxed">
                {language === 'en' 
                  ? "Show this screen to the Kazakh students to get your prizes!" 
                  : "向哈萨克斯坦学生展示此屏幕以获得您的奖品！"
                }
              </p>
            </div>
          </div>
          <button
            onClick={resetQuiz}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            <Trophy size={20} />
            {language === 'en' ? 'Take Quiz Again' : '重新参加测验'}
          </button>
        </div>
      </div>
    );
  }

  // Quiz question screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex flex-col">
      {/* Progress bar */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{language === 'en' ? 'Question' : '问题'} {currentQuestion + 1}/10</span>
            <span>{Math.round(((currentQuestion + 1) / 10) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question content */}
      <div className="flex-1 flex flex-col p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full mx-auto flex-1 flex flex-col">
          {/* Question image */}
          <div className="mb-6">
            <img 
              src={currentQuiz.image} 
              alt="Question illustration"
              className="w-full h-48 object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Question text */}
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center leading-relaxed">
            {currentQuiz.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-6 flex-1">
            {currentQuiz.options.map((option, index) => {
              let optionStyle = "w-full py-4 px-4 text-left rounded-xl border-2 transition-all duration-200";
              
              if (showResult) {
                if (index === currentQuiz.correctAnswer) {
                  optionStyle += " bg-green-100 border-green-500 text-green-800 font-semibold";
                } else if (index === selectedOption && index !== currentQuiz.correctAnswer) {
                  optionStyle += " bg-red-100 border-red-500 text-red-800 font-semibold";
                } else {
                  optionStyle += " bg-gray-50 border-gray-200 text-gray-600";
                }
              } else {
                optionStyle += " bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800 cursor-pointer";
              }

              return (
                <div
                  key={index}
                  className={optionStyle}
                  onClick={() => !showResult && handleOptionSelect(index)}
                >
                  {option}
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-blue-800 text-sm leading-relaxed">
                {currentQuiz.explanation}
              </p>
            </div>
          )}

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={!showResult}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              showResult 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestion === 9 
              ? (language === 'en' ? 'View Results' : '查看结果')
              : (language === 'en' ? 'Next Question' : '下一题')
            }
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
