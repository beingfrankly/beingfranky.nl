import Link from "next/link";

const links = [
  { name: "Home", to: "/" },
  { name: "Blog", to: "/blog" },
];

const Navigation: React.FC = () => {
  return (
    <nav className="flex items-center justify-between p-6">
      <div>
        <Link href="/">
          <a className="font-semibold">BeingFrankly</a>
        </Link>
      </div>
      <ul role="list" className="flex items-center gap-5 list-none">
        {links.map(({ name, to }, index) => (
          <li key={index}>
            <Link href={to}>
              <a className="font-medium hover:underline underline-offset-1 decoration-2">
                {name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
