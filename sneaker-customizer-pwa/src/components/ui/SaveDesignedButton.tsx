import React, { useState } from "react";
import { saveDesignToFirestore } from "../../utils/saveDesignToFirestore";
import CustomButton from "./CustomButton";
import { toast } from "react-toastify";

const SaveDesignButton: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await saveDesignToFirestore();
      toast.success("Design saved successfully!");
    } catch (err: any) {
      console.error("Save design error:", err);
      toast.error("Failed to save design");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <CustomButton
        title={loading ? "Saving..." : "Save Design"}
        customStyle="text-xs"
        handleClick={handleSave}
      />
    </div>
  );
};

export default SaveDesignButton;
