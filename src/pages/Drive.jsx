import FileGrid from "@/components/files/FileGrid";
import Breadcrumbs from "@/components/layout/Breadcrums";
import React from "react";

const Drive = () => {
  return (
    <div>
      {/* breadcrums  */}

      <Breadcrumbs />

      {/* folder & files  */}
      <FileGrid />
    </div>
  );
};

export default Drive;
