import React from "react";
import Tab from "./Tab";
import { TabItem } from "./Tab";

interface TabsListProp {
  tabs: TabItem[];
}

const TabsList = ({ tabs }: TabsListProp) => {
  return (
    <div>
      {tabs.map((tab) => (
        <Tab key={tab.id} tab={tab} />
      ))}
    </div>
  );
};

export default TabsList;
