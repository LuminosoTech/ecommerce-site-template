import React, { useEffect, useState } from "react";
import { TText } from "@components/text/Text";
import { Modal } from "@components/modal/center/Modal";

export const ConsentManagementModal = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // setTimeout(() => {
    //   setVisible(true);
    // }, 2000);
  }, []);

  return (
    <Modal
      visible={visible}
      onClose={() => {
        setVisible(false);
      }}
    >
      <div className="container">
        <TText text="brandingName" />
      </div>
    </Modal>
  );
};
