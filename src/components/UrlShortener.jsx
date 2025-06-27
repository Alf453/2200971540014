import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { logEvent } from "../middleware/logger";
import { generateShortcode, validateUrl } from "../utils/helpers";

function UrlShortener() {
  const [inputs, setInputs] = useState([
    { url: "", validity: "", customCode: "", result: null, error: null },
  ]);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const addInput = () => {
    if (inputs.length < 5) {
      setInputs([
        ...inputs,
        { url: "", validity: "", customCode: "", result: null, error: null },
      ]);
    }
  };

  const handleSubmit = () => {
    const updatedInputs = inputs.map((input) => {
      if (!validateUrl(input.url)) {
        return { ...input, error: "Invalid URL" };
      }

      const validity = parseInt(input.validity);
      const isValidValidity = !isNaN(validity) && validity > 0;
      const shortcode = input.customCode || generateShortcode();

      const expiry = new Date();
      expiry.setMinutes(
        expiry.getMinutes() + (isValidValidity ? validity : 30)
      );

      const result = {
        original: input.url,
        shortcode,
        expiry: expiry.toLocaleString(),
      };

      logEvent("Shortened URL created", result);

      // Save to localStorage or memory
      const stored = JSON.parse(localStorage.getItem("shortenedUrls") || "[]");
      localStorage.setItem(
        "shortenedUrls",
        JSON.stringify([...stored, result])
      );

      return { ...input, result, error: null };
    });

    setInputs(updatedInputs);
  };

  return (
    <Card sx={{ p: 2, m: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          URL Shortener
        </Typography>
        {inputs.map((input, i) => (
          <Grid container spacing={2} key={i} sx={{ mb: 1 }}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Long URL"
                value={input.url}
                onChange={(e) => handleChange(i, "url", e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Validity (min)"
                value={input.validity}
                onChange={(e) => handleChange(i, "validity", e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label="Custom Code"
                value={input.customCode}
                onChange={(e) => handleChange(i, "customCode", e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              {input.result && (
                <Typography>
                  Short URL: http://localhost:3000/{input.result.shortcode}{" "}
                  (expires {input.result.expiry})
                </Typography>
              )}
              {input.error && (
                <Typography color="error">{input.error}</Typography>
              )}
            </Grid>
          </Grid>
        ))}
        <Button onClick={addInput} disabled={inputs.length >= 5} sx={{ mr: 1 }}>
          Add More
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Shorten URLs
        </Button>
      </CardContent>
    </Card>
  );
}

export default UrlShortener;
