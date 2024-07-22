import { Send } from "lucide-react";
import Button from "./default/button";

interface SendScheduleButtonProps {
  completion: string
}

const PHONE_NUMBER = process.env.PHONE_NUMBER ?? ""

function SendScheduleButton({ completion }: SendScheduleButtonProps) { 
  function handleWhatsappWebMessage() {
    let phoneNumber = PHONE_NUMBER.replace(/[^\w\s]/gi, "").replace(/ /g, "")

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(completion)}`
    
    window.open(url)
  }

  return (
    <Button size="small" onClick={handleWhatsappWebMessage}>
      <span> Send </span>{" "}
      <Send className="size-4" />
    </Button>
  );
}

export default SendScheduleButton;
