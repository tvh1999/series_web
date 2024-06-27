import React from "react";

const SeriesListWrapper = ({
  children,
  className,
  heading,
}: {
  children: React.ReactNode;
  className?: string;
  heading?: string;
}) => {
  return (
    <section className="mt-6 w-fit max-w-full">
      <h3 className="mb-9 text-32 capitalize">{heading}</h3>
      <div className={className}>{children}</div>
    </section>
  );
};

export default SeriesListWrapper;
