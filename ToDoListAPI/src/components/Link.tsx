import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom';

interface CustomLinkProps extends RouterLinkProps {
  text: string;
}

const CustomLink = ({ to, text, className, ...rest}: CustomLinkProps) => {
  return (
    <RouterLink
      to={to}
      className="text-sm sm:text-base lg:text-xl w-full text-center px-6 py-2 bg-gray-300 rounded-lg hover:text-amber-50 hover:bg-gray-700 hover:transition hover:duration-500"
      {...rest}
    >
      {text}
    </RouterLink>
  );
};

export default CustomLink;