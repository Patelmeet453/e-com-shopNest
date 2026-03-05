import { Mic } from "lucide-react";
import { useAIVoiceNavigation } from "../hooks/useVoiceNavigation";

const VoiceNavButton = () => {
  const { startListening } = useAIVoiceNavigation();

  return (
    <button
      onClick={startListening}
      className="
        flex items-center gap-2
        p-4 rounded-full
        bg-emerald-600 hover:bg-emerald-700
        text-white text-sm
        shadow-lg shadow-emerald-600/20
      "
    >
      <Mic size={24} />
    </button>
  );
};

export default VoiceNavButton;
