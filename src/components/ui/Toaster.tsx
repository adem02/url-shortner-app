import {Toaster as Sonner} from "sonner";

export function Toaster() {
  return (
    <Sonner
      closeButton={true}
      theme="light"
      position="top-center"
      gap={8}
    />
  );
}