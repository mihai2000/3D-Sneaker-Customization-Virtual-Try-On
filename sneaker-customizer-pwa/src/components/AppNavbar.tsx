import React from 'react';
import {
  // Navbar,
  // Typography,
  // Button,
  // IconButton,
  // Collapse,
  MobileNav,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
// import { color } from 'three/tsl';

const AppNavbar: React.FC = () => {
  const [openNav, setOpenNav] = React.useState(false);

  // Close nav on window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link
          to="/"
          className="mr-4 cursor-pointer py-1.5 font-bold text-2xl hover:text-blue-600 transition-colors"
        >
          SneakerCustomizer
        </Link>
        <div className="lg:flex items-center gap-6">
          {/* <Typography
            as="a"
            href="/customizer"
            className="cursor-pointer hover:text-blue-600 transition-colors"
          >
            Customize
          </Typography>
          <Typography
            as="a"
            href="/cart"
            className="cursor-pointer hover:text-blue-600 transition-colors"
          >
            Cart
          </Typography>
          <Typography
            as="a"
            href="/orders"
            className="cursor-pointer hover:text-blue-600 transition-colors"
          >
            Orders
          </Typography>
          <Typography
            as="a"
            href="/login"
            className="cursor-pointer hover:text-blue-600 transition-colors"
          >
            Login
          </Typography> */}
          <Link
            to="/customizer"
            className="cursor-pointer hover:text-blue-600 px-4 py-2"
            style={{
              color: 'black !important',
            }}
          >
            Customize
          </Link>
          <Link
            to="/cart"
            className="cursor-pointer hover:text-blue-600 px-4 py-2"
          >
            Cart
          </Link>
          <Link
            to="/orders"
            className="cursor-pointer hover:text-blue-600 px-4 py-2"
          >
            Orders
          </Link>
          <Link
            to="/login"
            className="cursor-pointer hover:text-blue-600 px-4 py-2"
          >
            Login
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            // variant="gradient"
            // size="sm"
            className="hidden lg:inline-block"
          >
            <Link to="/customizer">Get Started</Link>
          </button>

          {/* <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            )}
          </IconButton> */}
        </div>
      </div>
      <MobileNav open={openNav}>
        <div className="flex flex-col gap-2 py-2 lg:hidden">
          <Link
            to="/customizer"
            className="cursor-pointer text-black hover:text-blue-600 px-4 py-2"
          >
            Customize
          </Link>
          <Link
            to="/cart"
            className="cursor-pointer hover:text-blue-600 px-4 py-2"
          >
            Cart
          </Link>
          <Link
            to="/orders"
            className="cursor-pointer hover:text-blue-600 px-4 py-2"
          >
            Orders
          </Link>
          <Link
            to="/login"
            className="cursor-pointer hover:text-blue-600 px-4 py-2"
          >
            Login
          </Link>
          {/* <Typography
            as="a"
            href="/customizer"
            className="cursor-pointer hover:text-blue-600 px-4 py-2"
          >
            Customize
          </Typography>
          <Typography
            as="a"
            href="/cart"
            className="cursor-pointer hover:text-blue-600 px-4 py-2"
          >
            Cart
          </Typography>
          <Typography
            as="a"
            href="/orders"
            className="cursor-pointer hover:text-blue-600 px-4 py-2"
          >
            Orders
          </Typography>
          <Typography
            as="a"
            href="/login"
            className="cursor-pointer hover:text-blue-600 px-4 py-2"
          >
            Login
          </Typography> */}
          <button className="mx-4">
            <Link to="/customizer">Get Started</Link>
          </button>
        </div>
      </MobileNav>
    </nav>
  );
};

export default AppNavbar;
