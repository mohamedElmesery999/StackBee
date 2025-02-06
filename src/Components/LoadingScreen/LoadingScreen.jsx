
import React from "react";
import {Card, Skeleton} from "@heroui/react";

export default function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };

  return (
    <div className="flex flex-col gap-3">
      <Card className="w-full text-center space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg" isLoaded={isLoaded}>
          <div className="h-56 rounded-lg bg-secondary" />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg" isLoaded={isLoaded}>
            <div className="h-3 w-full rounded-lg bg-secondary" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg" isLoaded={isLoaded}>
            <div className="h-3 w-full rounded-lg bg-secondary-300" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg" isLoaded={isLoaded}>
            <div className="h-3 w-full rounded-lg bg-secondary-200" />
          </Skeleton>
        </div>
      </Card>
    </div>
  );
}

