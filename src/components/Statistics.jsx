import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function Statistics() {
  const urls = JSON.parse(localStorage.getItem("shortenedUrls") || "[]");

  return (
    <Card sx={{ p: 2, m: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          URL Statistics
        </Typography>
        {urls.map((item, index) => (
          <Typography key={index}>
            Short URL: http://localhost:3000/{item.shortcode} → {item.original}{" "}
            (expires: {item.expiry})
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}

export default Statistics;
