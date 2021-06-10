import React from "react";
import RootLayout from "../components/rootLayout";

export const wrapRootElement = ({ element }) => {
  console.info(`inside wrapRootElement`);

  return (
    <RootLayout>
      {element}
    </RootLayout>
  );
};
