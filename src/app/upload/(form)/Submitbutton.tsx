"use client";

import { useFormStatus } from "react-dom";

import React from "react";

const Submitbutton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="submit-button" aria-disabled={pending}>
      {pending ? "Uploading...." : "Upload File"}
    </button>
  );
};

export default Submitbutton;
