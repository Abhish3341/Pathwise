// framer-motion.d.ts
import * as React from "react";

declare module "framer-motion" {
  export interface AnimatePresenceProps {
    children?: React.ReactNode;
    mode?: "wait" | "sync";
    initial?: boolean;
    onExitComplete?: () => void;
    custom?: any;
  }
}
