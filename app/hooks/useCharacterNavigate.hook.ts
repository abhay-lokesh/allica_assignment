import { useNavigate } from "react-router";
import type { CharacterDisplay } from "~/types/character.type";
import { urlDestructure } from "~/utils";

export const useCharacterNavigate = () => {
  const navigate = useNavigate();
  const onRowClick = (data: CharacterDisplay) => {
    if (data.url) {
      const id = urlDestructure(data.url);
      navigate(`/people/${id}`, { viewTransition: true });
    }
  };
  return { onRowClick };
};
