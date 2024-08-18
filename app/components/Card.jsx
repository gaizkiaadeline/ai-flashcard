import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Assuming Button component exists

function FlipCard({ title, question, answer, difficulty = "easy" }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggle = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="flip-card-container w-[350px] h-[300px] grow">
      <div className={`flip-card ${isFlipped ? "flipped" : ""} relative`}>
        <div className="flip-card-front absolute">
          <Card className="w-[350px] h-[300px] ">
            <CardHeader>
              <CardTitle className="text-2xl mb-2">{title}</CardTitle>
              <CardDescription>
                <span
                  className={`  ${
                    difficulty === "easy"
                      ? "text-green-500 bg-green-500/20"
                      : difficulty === "medium"
                      ? "text-yellow-500 bg-yellow-500/20"
                      : "text-red-500 bg-red-500/20"
                  } p-1 px-2 rounded-full`}
                >
                  {difficulty}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{question}</p>
            </CardContent>
            <CardFooter className="flex justify-between absolute bottom-4">
              <Button variant="outline" onClick={handleToggle}>
                Show Answer
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="flip-card-back absolute ">
          <Card className="w-[350px] h-[300px] bg-gray-300">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>
                <span
                  className={`  ${
                    difficulty === "easy"
                      ? "text-green-500 bg-green-500/20"
                      : difficulty === "medium"
                      ? "text-yellow-500 bg-yellow-500/20"
                      : "text-red-500 bg-red-500/20"
                  } p-1 px-2 rounded-full`}
                >
                  {difficulty}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{answer}</p>
            </CardContent>
            <CardFooter className="flex justify-between absolute bottom-4">
              <Button variant="outline" onClick={handleToggle}>
                Show Question
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
