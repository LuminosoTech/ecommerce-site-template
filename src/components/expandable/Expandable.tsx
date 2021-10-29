import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExpandableProps {
  isOpen?: boolean;
  placeholder: () => JSX.Element;
  expandableContent: () => JSX.Element;
  onClick?: () => void;
}

export const Expandable = (props: ExpandableProps) => {
  const { isOpen, onClick, placeholder, expandableContent } = props;

  const [open, setOpen] = useState(false);

  const renderPlaceholder = () => {
    return placeholder();
  };

  const children = (
    <>
      {renderPlaceholder()}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {expandableContent()}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );

  return <div>{children}</div>;
};
