import React, { useState } from "react";
import { Input, Button, Modal } from "antd";
import { useAIImageGenerator } from "../_actions/Bot1";
import { getImageFileURL } from "../_actions/Bot1";

const { TextArea } = Input;

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState({ value: "", params: null });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useAIImageGenerator((result) => {
    const img_obj = result?.data?.data;
    if (result?.success && img_obj?.filename_disk) {
      setPreview({
        value: getImageFileURL(img_obj.filename_disk),
        params: img_obj,
      });
      setIsModalOpen(true);
    } else {
      Modal.error({
        title: "Image Generation Failed",
        content: "No image was generated. Please try again.",
      });
    }
  });

  const handleGenerate = () => {
    if (!prompt.trim()) {
      return Modal.warning({
        title: "Empty Prompt",
        content: "Please enter a prompt before generating an image.",
      });
    }
    mutation.mutate({ prompt });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fafafa",
        padding: "1rem",
      }}
    >
      <div
        style={{
          border: "2px dashed #d9d9d9",
          borderRadius: 10,
          padding: "3rem 2rem",
          maxWidth: 600,
          width: "100%",
          textAlign: "center",
          background: "#fff",
        }}
      >
        
        <h3 style={{ marginTop: 16 }}>Image Generator</h3>
       

        <TextArea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image to generate..."
          style={{ marginBottom: 16 }}
        />

        <Button
          type="primary"
          onClick={handleGenerate}
          loading={mutation.isLoading}
        >
          Generate Image
        </Button>

       
      </div>

      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        width={600}
        centered
      >
        <img
          src={preview.value}
          alt="Generated"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      </Modal>
    </div>
  );
};

export default App;