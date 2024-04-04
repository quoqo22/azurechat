"use client";


import { useTheme } from "next-themes";

import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Tabs
      defaultValue={theme}
      className="flex flex-col rounded-full overflow-hidden"
    >

    </Tabs>
  );
}


