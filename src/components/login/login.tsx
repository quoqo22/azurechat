"use client";
import { AI_NAME } from "@/features/theme/customise";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export const LogIn = () => {
  // Remove the handleAiIconClick function

  return (
    <Card className="flex gap-2 flex-col min-w-[300px]">
      <CardHeader className="gap-2">
        <CardTitle className="text-2xl flex gap-2">
          {/* Remove the onClick event from the Avatar component */}
          <Avatar className="h-14 w-14">
            <AvatarImage src={"ai-icon.png"} />
          </Avatar>
          <span className="text-primary">{AI_NAME}</span>
        </CardTitle>
        <CardDescription>
          {/* You can keep or modify the CardDescription content as needed */}
        </CardDescription>
      </CardHeader>
      {/* Remove the Microsoft 365 button */}
      <CardContent className="grid gap-4">
        {/* You can add additional content here if needed */}
      </CardContent>
    </Card>
  );
};
