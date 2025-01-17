"use client";

import React, { useState, useEffect } from "react";
import LoadingAnimation from "../loader";


interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 20000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingAnimation onComplete={() => setIsLoading(false)} />
      ) : (
        <div id="content">{children}</div>
      )}
    </>
  );
};

export default ClientWrapper;