"use client"

import Image from "next/image";
import { useRouter } from "next/navigation"
import { FaPlay } from "react-icons/fa"

interface ListItemProps {
  image: string;
  name:string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({
  image,
  name,
  href
}) => {

  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };

return (
  <button
    className="
      relative
      group
      flex
      items-center
      rounded-md
      overflow-hidden
      gap-x-3
      bg-neutral-100/10
      hover:bg-neutral-100/20
      transistion
      pr-4
      "
  >
    <div
      className="
        relative
        min-h-[64px]
        min-w-[64px]
        "
    >
      <Image
        fill
        src={image}
        alt={image}
        className="
          object-cover
          "
      />
    </div>
      <p
        className="
          font-medium
          truncate
          py-5
          "
      >
        {name}
      </p>
      <div
        onClick={onClick}
        className="
          absolute
          transition
          opacity-0
          rounded-full
          flex
          items-center
          justify-center
          bg-green-400
          p-3
          drop-shadow-md
          right-5
          group-hover:opacity-100
          hover:scale-110          "
      >
        <FaPlay
          size={13}
          className="
            text-black
            "
        />
      </div>
  </button>
)
};

export default ListItem;