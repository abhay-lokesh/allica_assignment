import Button from "~/components/Button";
import { ACCESIBILITY_TEXT } from "~/constants/accessibility.constant";
import { useBoundStore } from "~/store/base.store";

const FavoriteContainer = ({
  name,
  variant = "ROW",
}: {
  name: string;
  variant?: "ROW" | "CONTAINER";
}) => {
  const addRemoveFavorite = useBoundStore((state) => state.addRemoveFavorite);
  const favorites = useBoundStore((state) => state.favorites);
  const isFavorite = favorites?.includes(name || "");

  return (
    <div className="pt-2">
      <Button
        iconConfig={{
          icon: "heart",
          label: `${ACCESIBILITY_TEXT.FAVORITE} ${
            isFavorite ? "Faroited" : "Unfavorited"
          }`,
        }}
        styles={{ variant: "ICON", size: variant === "ROW" ? "SM" : "LG" }}
        className={`${isFavorite ? "text-orange-600" : ""}`}
        onButtonClick={() => addRemoveFavorite(name || "")}
        iconWidth={isFavorite ? "BOLD" : "THIN"}
      />
    </div>
  );
};

export default FavoriteContainer;
