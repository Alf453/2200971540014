import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function RedirectHandler() {
  const { shortcode } = useParams();

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem("shortenedUrls") || "[]");
    const match = urls.find((u) => u.shortcode === shortcode);
    if (match) {
      window.location.href = match.original;
    } else {
      alert("Invalid or expired shortcode.");
    }
  }, [shortcode]);

  return <p>Redirecting...</p>;
}

export default RedirectHandler;
