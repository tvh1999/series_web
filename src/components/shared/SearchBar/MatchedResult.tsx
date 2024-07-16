import Image from "next/image";
import Link from "next/link";

const MatchedResult = ({
  hrefLink,
  title,
  type,
}: {
  hrefLink: string;
  title: string;
  type: string;
}) => {
  return (
    <Link href={hrefLink} className="flex items-center gap-x-2">
      <Image src={"/assets/tag.svg"} width={24} height={24} alt="item icon" />
      <div>
        <p>{title}</p>
        <p>{type}</p>
      </div>
    </Link>
  );
};

export default MatchedResult;
