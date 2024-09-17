import Link from "next/link";
import Text from "@/components/text";
import type { TextVariant } from "@/components/text";

const StyledLink = ({
  href,
  children,
  variant,
}: {
  href: string;
  children: React.ReactNode;
  variant: TextVariant;
}) => {
  return (
    <div className="relative w-fit">
      <Link href={href}>
        <Text
          className="
          relative
          text-blue-500
          after:absolute
          after:bottom-0
          after:left-0
          after:h-[2px]
          after:w-full
          after:origin-bottom-right
          after:scale-x-100
          after:bg-blue-500
          after:transition-transform
          after:duration-300
          after:ease-out
        "
          variant={variant}
        >
          {children}
        </Text>
      </Link>
    </div>
  );
};

export default StyledLink;
