"use client";
import React from "react";
const ClientOnlyWrapper = function ({
  children,
  delegatedClasses,
}: {
  children: React.ReactNode;
  delegatedClasses?: string;
}) {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <div className={delegatedClasses}>{children}</div>;
};

export default ClientOnlyWrapper;
