import React, { useState } from "react";
import { Input, Button, Modal, Spin, Row, Col } from "antd";
import { useAIImageGenerator } from "../_actions/Bot1"; 
import { getImageFileURL } from "../_actions/Bot1"; 
const { TextArea } = Input;

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useAIImageGenerator((result) => {
  if (result?.success && result?.data?.data?.filename_disk) {
    const imageUrl = getImageFileURL(result.data.data.filename_disk);
    setPreview(imageUrl);
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
    <div style={{ height: "100vh", padding: "2rem" }}>
      <Row gutter={16} style={{ height: "100%" }}>
   
        <Col span={12} style={{ borderRight: "1px solid #eee" }}>
          <h2>Enter Prompt</h2>
          <TextArea
            rows={6}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
          />
          <Button
            type="primary"
            style={{ marginTop: 16 }}
            loading={mutation.isLoading}
            onClick={handleGenerate}
          >
            Generate Image
          </Button>
        </Col>

        <Col span={12} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div>
            <h2>Preview</h2>
            {mutation.isLoading }
            {!mutation.isLoading && !preview && <p>No image generated yet.</p>}
          </div>
        </Col>
      </Row>

     
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        width={600}
        centered
      >
        <img
          src={preview}
          alt="Generated"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      </Modal>
    </div>
  );
};

export default App;



