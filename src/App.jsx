import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

const App = () => {
  const [stepId, setStepId] = useState(0);
  const [history, setHistory] = useState([0]);

  const script = [
    {
      id: 0,
      phrase: "Доброго дня. Мене звати Олена, я менеджер компанії 'Інженерно-Промислова група'. Це 'Назва компанії в яку ми телефонуємо'?",
      responses: [
        { text: "Так", nextId: 1 },
        { text: "Ні", nextId: 2 },
      ],
    },
    {
      id: 1,
      phrase: "Можливо у Вас виникли питання?...",
      responses: [
        { text: "З'єднати з ЛПР", nextId: 3 },
        { text: "Не можу відповісти", nextId: 4 },
      ],
    },
    {
      id: 2,
      phrase: "Цей номер був у нас в базі...",
      responses: [
        { text: "Відповів(ла)", nextId: 1 },
        { text: "Не знаю", nextId: 4 },
      ],
    },
    {
      id: 3,
      phrase: "У нас дуже широкий асортимент...",
      responses: [
        { text: "Добре, з'єдную", nextId: 5 },
        { text: "Не можу", nextId: 6 },
      ],
    },
    {
      id: 4,
      phrase: "Дякую Вам за приділений час...",
      responses: [],
    },
    {
      id: 5,
      phrase: "Доброго дня. Я правильно розумію...",
      responses: [
        { text: "Так", nextId: 7 },
        { text: "Ні", nextId: 6 },
      ],
    },
    {
      id: 6,
      phrase: "Скажіть, будь ласка, Ви отримували...",
      responses: [
        { text: "Так, отримував", nextId: 7 },
        { text: "Ні, не отримував", nextId: 7 },
      ],
    },
    {
      id: 7,
      phrase: "Можливо Ви їх називаєте...",
      responses: [
        { text: "Призначити час", nextId: 8 },
        { text: "Не зацікавлений", nextId: 4 },
      ],
    },
    {
      id: 8,
      phrase: "Дякую. Наш спеціаліст обов’язково зв’яжеться.",
      responses: [],
    },
  ];

  const currentStep = script.find((s) => s.id === stepId);

  const handleResponse = (nextId) => {
    setHistory((prev) => [...prev, nextId]);
    setStepId(nextId);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const prevId = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setStepId(prevId);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <Card className="w-full max-w-md text-center">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">{currentStep.phrase}</h2>
          <div className="flex flex-col gap-2">
            {currentStep.responses.map((res, idx) => (
              <Button key={idx} onClick={() => handleResponse(res.nextId)}>
                {res.text}
              </Button>
            ))}
            {history.length > 1 && (
              <Button variant="outline" onClick={goBack}>
                Назад
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
