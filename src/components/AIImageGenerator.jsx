import React, { useState } from "react";
import { Input, Button, Typography, Card, Spin } from "antd";
import { useAIImageGenerator, getImageFileURL } from "../_actions/bot";
import styles from "./AIImageGenerator.module.css";

const { TextArea } = Input;
const { Title } = Typography;

const AIImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const mutationImgGen = useAIImageGenerator(
    (result) => {
      console.log("Result ", result);
      if (result?.success) {
        const img_obj = result?.data?.data;
        setPreview({
          params: img_obj,
          value: getImageFileURL(img_obj.filename_disk),
        });
      }
    },
    () => setLoading(false)
  );

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    setLoading(true);
    mutationImgGen.mutate({ prompt });
    setPrompt("");
  };

  return (
    <div className={styles.container}>
      <Title level={2}>AI Image Generator</Title>

      <TextArea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your image prompt..."
        rows={4}
        style={{ marginBottom: "1rem" }}
      />

      <Button type="primary" onClick={handleSubmit} disabled={loading}>
        {loading ? "Generating..." : "Generate Image"}
      </Button>

      {loading && <Spin style={{ marginTop: "20px" }} />}

      {preview?.value && (
        <Card title="Generated Image" style={{ marginTop: "2rem" }}>
          <img
            src={preview.value}
            alt="AI Generated"
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "contain",
            }}
          />
        </Card>
      )}
    </div>
  );
};

export default AIImageGenerator;
