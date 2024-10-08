import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { ArrowRight } from "lucide-react";

const HomeBtn = () => {
  return (
    <Button
      as={Link}
      className="text-sm font-semibold text-default-600 bg-default-100 rounded tracking-widest "
      color="primary"
      href="/news-feed"
    >
      Start Reading <ArrowRight />
    </Button>
  );
};

export default HomeBtn;
